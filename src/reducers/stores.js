import {
    SET_STORES,
    LOADING_STORES,
    ADD_STORE,
    STORE_ERRORS,
    SET_STORE_ID,
    UPDATE_STORE
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

        case UPDATE_STORE:
            return {
                ...state,
                stores: [...state.stores.map(
                    (store, i) => i === store[i] ? { ...store, stores: action.payload } : store
                )]
            }

        default:
            return state
    }
}