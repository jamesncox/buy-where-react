import {
    SET_STORES,
    LOADING_STORES,
    ADD_STORE,
    ADD_ITEM_TO_STORE,
    STORE_ERRORS,
    SET_STORE_ID
} from '../actionTypes'

export default (state = {
    stores: [],
    loading: false,
    errors: null,
    storeId: null
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

        case SET_STORE_ID:
            return { ...state, storeId: action.payload }

        default:
            return state
    }
}