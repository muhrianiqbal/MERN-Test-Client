import { CREATE_A_MOVIE, FETCH_ALL_MOVIES, FETCH_ONE_MOVIE, SET_LOADING, SET_ERROR, SET_LOGIN } from '../actions';

const initialState = {
  movies: [],
  detail: null,
  isLoading: true,
  isLogin: false,
  isError: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case(CREATE_A_MOVIE): {
      state.movies.unshift(payload);
      return state;
    }
    case(FETCH_ALL_MOVIES): {
      return { ...state, movies: payload }
    }
    case(FETCH_ONE_MOVIE): {
      return { ...state, detail: payload }
    }
    case(SET_LOGIN): {
      return { ...state, isLogin: payload }
    }
    case(SET_LOADING): {
      return { ...state, isLoading: payload }
    }
    case(SET_ERROR): {
      return { ...state, isError: payload }
    }
    default:
      return state;
  }
}

export default reducer;