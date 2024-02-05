import {createSlice} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';


const songSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [],
    isLoading: false,
  },
  reducers: {
    getSongsFetch: (state) => {
      state.isLoading = true;
    },
    getSongsSuccess: (state, action) => {
      state.songs = action.payload;
      state.isLoading = false;
    },
    getSongsFailure: (state) => {
      state.isLoading = false;
    },
    addSong: (state, action) => {
      const newSong = {
        songId: uuidv4(), 
        ...action.payload,
      };
      state.songs.push(newSong);
    },
    updateSong: (state, action) => {
      const updatedSong = {
        songId: action.payload.songId, 
        ...action.payload,
      };
      const index = state.songs.findIndex((song) => song.songId === updatedSong.songId);
      if (index !== -1) {
        state.songs[index] = updatedSong;
      }
    },
    removeSong: (state, action) => {
      const songId = action.payload;
      state.songs = state.songs.filter(song => song.songId !== songId);
    },
  },
});

export const {
  getSongsFailure,
  getSongsFetch,
  getSongsSuccess,
  addSong,
  updateSong,
  removeSong,
} = songSlice.actions;

export default songSlice.reducer;
