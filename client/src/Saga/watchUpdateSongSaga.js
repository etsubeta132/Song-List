import { call,takeEvery } from 'redux-saga/effects';


const API_BASE_URL = 'https://song-list-server.vercel.app';
function* workUpdateSong(action) {
  try {
    const {songId, ...data } = action.payload;
    yield call(fetch, `${API_BASE_URL}/${songId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
  } catch (error) {
    console.error('Error updating song:', error.message);
  }
}

export function* watchUpdateSong() {
  yield takeEvery('songs/updateSong', workUpdateSong);
}
