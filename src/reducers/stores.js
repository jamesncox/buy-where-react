import {
    SET_STORES,
    LOADING_STORES
} from '../actionTypes'

export default (state = { stores: [], loading: true }, action) => {
    switch (action.type) {

        case LOADING_STORES:
            return { ...state, stores: [...state.stores], loading: true }

        case SET_STORES:
            console.log(action.payload)
            return { ...state, stores: action.payload, loading: false }

        default:
            return state
    }
}