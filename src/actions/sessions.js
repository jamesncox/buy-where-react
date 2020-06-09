import { SET_TOKEN } from '../actionTypes'

const setToken = (token) => {
    return dispatch => {
        console.log(token)
        dispatch({ type: SET_TOKEN, payload: token })
    }
}

export function getToken() {
    return (dispatch) => {
        fetch('https://memes-vs-gifs.herokuapp.com/api/v1/auth_check')
            .then(res => res.json())
            .then(token => dispatch(setToken(token.csrf_auth_token)))
    }
}