import {
    SET_STORES,
    LOADING_STORES,
    CREATE_STORE,
    STORE_ERRORS,
    SET_STORE_ID,
    UPDATE_STORE,
    DELETE_STORE,
    CLEAR_IS_STORE_LOADING
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

        case CREATE_STORE:
            return { ...state, stores: [...state.stores, action.payload] }

        case STORE_ERRORS:
            return { ...state, errors: action.payload }

        case SET_STORE_ID:
            return { ...state, storeId: action.payload }

        case UPDATE_STORE:
            const updatedStores = state.stores.map((store, index) => {
                if (store.id === action.payload.id) {
                    return {
                        ...store,
                        name: action.payload.name,
                        store_type: action.payload.store_type,
                        color: action.payload.color,
                    }
                }
                return store
            })
            return { ...state, stores: updatedStores, loading: false }

        case DELETE_STORE:
            const persistedStores = state.stores.filter(store => store.id !== action.payload.id)
            return { ...state, stores: persistedStores }

        case CLEAR_IS_STORE_LOADING:
            return { ...state, loading: false }

        default:
            return state
    }
}