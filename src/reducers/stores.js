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
    loading: true,
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

        case ADD_ITEM_TO_STORE:
            // let specificStore = state.stores.filter(store => store.id === state.storeId)
            debugger
            const itemToAdd = action.payload
            const index = state.stores.findIndex(
                store => store.id === state.storeId
            )
            const storeToUpdate = {
                ...state.stores.slice(index, index + 1)[0]
            }
            const updatedItemsArr = [
                ...storeToUpdate.items, itemToAdd
            ]
            const updatedStore = {
                ...storeToUpdate, items: updatedItemsArr
            }
            return { ...state.stores.slice(0, index), updatedStore, ...state.stores.slice(index + 1) }

        case STORE_ERRORS:
            return { ...state, errors: action.payload }

        case SET_STORE_ID:
            return { ...state, storeId: action.payload }

        default:
            return state
    }
}