import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getSongsSuccess } from '../songState';
import { watchAddSong } from './watchAddSongSaga';
import { watchUpdateSong } from './watchUpdateSongSaga';
import { watchRemoveSong } from './watchRemoveSongSaga';

const API_BASE_URL = 'http://localhost:3001/api/songs';

function* workgetSongsFetch() {
    try {
      const songs = yield call(() => fetch(API_BASE_URL));
      const formattedSong = yield songs.json();
      const formatedSongShortend = formattedSong.slice(0, 50);
  
      yield put(getSongsSuccess(formatedSongShortend));
    } catch (error) {
      console.error('Error fetching songs:', error.message);
    }
  }
  
function* songSaga() {
  yield all([
    takeEvery('songs/getSongsFetch', workgetSongsFetch),
    watchAddSong(),
    watchUpdateSong(),
    watchRemoveSong(),
    
  ]);
}

export default songSaga;
