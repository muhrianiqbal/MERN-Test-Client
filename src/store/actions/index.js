import axios from 'axios';
const baseURL = 'https://obscure-fjord-02961.herokuapp.com/' || 'http://localhost:3000/';

//Movies
export const CREATE_A_MOVIE = 'CREATE_A_MOVIE';
export const FETCH_ALL_MOVIES = 'FETCH_ALL_MOVIES';
export const FETCH_ONE_MOVIE = 'FETCH_ONE_MOVIE';
export const UPDATE_A_MOVIE = 'UPDATE_A_MOVIE';
export const DELETE_A_MOVIE = 'DELETE_A_MOVIE';
//Users
export const SET_LOGIN = 'SET_LOGIN';
//Loading & Error
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

//Movies
export const create_a_movie = (data) => {
  return (dispatch) => {
    dispatch(set_loading(true));
    axios({
      method: 'post',
      url: baseURL + 'add',
      headers: {
        token: localStorage.getItem('token')
      },
      data
    })
      .then(({data}) => {
        return dispatch(fetch_all_movies());
        // return dispatch({ type: CREATE_A_MOVIE, payload: data });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(_ => {
        dispatch(set_loading(false));
      })
  }
}

export const fetch_all_movies = () => {
  return (dispatch) => {
    dispatch(set_loading(true));
    axios({
      method: 'get',
      url: baseURL,
    })
      .then(({data}) => {
        return dispatch({ type: FETCH_ALL_MOVIES, payload: data });
      })
      .finally(_ => {
        dispatch(set_loading(false));
      })
  }
}

export const fetch_one_movies = (id) => {
  return (dispatch) => {
    dispatch(set_loading(true));
    axios({
      method: 'get',
      url: baseURL + 'detail/' + id
    })
      .then(({data}) => {
        return dispatch({ type: FETCH_ONE_MOVIE, payload: data });
      })
      .finally(_ => {
        dispatch(set_loading(false));
      })
  }
}

export const update_a_movie = (id, data) => {
  return (dispatch) => {
    axios({
      method: 'put',
      url: baseURL + 'edit/' + id,
      headers: {
        token: localStorage.getItem('token')
      },
      data
    })
      .then(({data}) => {
        return dispatch(fetch_all_movies());
      })
  }
}

export const delete_a_movie = (id) => {
  return (dispatch) => {
    axios({
      method: 'delete',
      url: baseURL + 'delete/' + id,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(({data}) => {
        return dispatch(fetch_all_movies());
      })
  }
}

//Users
export const set_login = (payload) => {
  return ({ type: SET_LOGIN, payload })
}

export const login = ({ email, password }) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: baseURL + 'login',
      data: {
        email,
        password
      }
    })
      .then(({data}) => {
        localStorage.setItem('token', data.token);
        return dispatch(set_login(true));
      })
  }
}

//Loading & Error
export const set_loading = (payload) => {
  return { type: SET_LOADING, payload };
}

export const set_error = (payload) => {
  return { type: SET_ERROR, payload };
}