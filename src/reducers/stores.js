import {
    SET_STORES,
    LOADING_STORES,
    CREATE_STORE,
    STORE_ERRORS,
    SET_STORE_ID,
    UPDATE_STORE,
    DELETE_STORE,
    CLEAR_IS_STORE_LOADING,
    LOADING_SINGLE_STORE
} from '../actionTypes'

export default (state = {
    stores: [],
    loadingStores: false,
    errors: null,
    storeId: null,
    loadingSingleStore: false
}, action) => {
    switch (action.type) {

        case LOADING_STORES:
            return { ...state, stores: [...state.stores], loadingStores: true }

        case LOADING_SINGLE_STORE:
            return { ...state, stores: [...state.stores], loadingSingleStore: true }

        case SET_STORES:
            return { ...state, stores: action.payload, loadingStores: false }

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
            return { ...state, stores: updatedStores, loadingSingleStore: false }

        case DELETE_STORE:
            const persistedStores = state.stores.filter(store => store.id !== action.payload.id)
            return { ...state, stores: persistedStores }

        case CLEAR_IS_STORE_LOADING:
            return { ...state, loadingSingleStore: false }

        default:
            return state
    }
}