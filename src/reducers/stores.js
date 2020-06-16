import {
    SET_STORES,
    LOADING_STORES,
    ADD_STORE,
    STORE_ERRORS
} from '../actionTypes'

export default (state = {
    stores: [],
    loading: true,
    errors: null
}, action) => {
    switch (action.type) {

        case LOADING_STORES:
            return { ...state, stores: [...state.stores], loading: true }

        case SET_STORES:
            return { ...state, stores: action.payload, loading: false }

        case ADD_STORE:
            return { ...state, stores: [...state.stores, action.payload] }

        case STORE_ERRORS:
            return { ...state, errors: action.payload }

        default:
            return state
    }
}