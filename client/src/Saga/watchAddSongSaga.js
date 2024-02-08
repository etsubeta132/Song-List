
import { call,takeEvery } from 'redux-saga/effects';


const API_BASE_URL = 'http://localhost:3001';

function* workAddSong(action) {
  try {
    yield call(fetch, API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });

  } catch (error) {
    console.error('Error adding song:', error.message);
  }
}

export function* watchAddSong() {
  yield takeEvery('songs/addSong', workAddSong);
}
