import { call, takeEvery } from 'redux-saga/effects';

const API_BASE_URL = 'http://localhost:3001/api/songs';

function* workRemoveSong(action) {
  const song = action.payload;
  console.log(`${API_BASE_URL}/${song.songId}`)
  try {
    yield call(fetch, `${API_BASE_URL}/${song.songId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting song:', error.message);
  }
}

export function* watchRemoveSong() {
  yield takeEvery('songs/removeSong', workRemoveSong);
}
