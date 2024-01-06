import {createSlice} from '@reduxjs/toolkit';



export const songSlice = createSlice({
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
        state.songs.push(action.payload);
      },
      updateSong: (state, action) => {
        const updatedSong = action.payload;
        console.log(updateSong,"action update")
        const index = state.songs.findIndex((song) => song.id === updatedSong.id);
        if (index !== -1) {
          state.songs[index] = updatedSong;
        }
      },
      removeSong: (state, action) => {
        state.songs = state.songs.filter((song) => song.id !== action.payload);
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
  
  

export default songSlice.reducer
