import { call,takeEvery } from 'redux-saga/effects';


const API_BASE_URL = 'http://localhost:3001/api/songs';
function* workUpdateSong(action) {
  try {
    const { id, ...data } = action.payload;
    yield call(fetch, `${API_BASE_URL}/${id}`, {
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
