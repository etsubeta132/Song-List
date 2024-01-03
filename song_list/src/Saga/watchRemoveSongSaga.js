import { call,takeEvery } from 'redux-saga/effects';


const API_BASE_URL = 'http://localhost:3001/api/songs';

function* workRemoveSong(action) {
  try {
    yield call(fetch, `${API_BASE_URL}/${action.payload}`, {
      method: 'DELETE',
    });
    
  } catch (error) {
    console.error('Error removing song:', error.message);
  }
}

export function* watchRemoveSong() {
  yield takeEvery('songs/removeSong', workRemoveSong);
}
