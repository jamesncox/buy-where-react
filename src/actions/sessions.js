import { SET_TOKEN } from '../actionTypes'

const setToken = (token) => {
    return dispatch => {
        dispatch({ type: SET_TOKEN, payload: token })
    }
}

export function getToken() {
    return (dispatch) => {
        fetch('https://cors-anywhere.herokuapp.com/https://buy-where.herokuapp.com/api/v1/auth_check')
            .then(res => res.json())
            .then(token => dispatch(setToken(token.csrf_auth_token)))
    }
}