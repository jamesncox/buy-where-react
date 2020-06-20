import {
    SET_ERRORS,
    CLEAR_ERRORS
} from '../actionTypes'

export default (state = {
    errors: null
}, action) => {
    switch (action.type) {

        case SET_ERRORS:
            console.log(action.payload)
            return { ...state, errors: action.payload }

        case CLEAR_ERRORS:
            return { ...state, errors: null }

        default:
            return state
    }
}