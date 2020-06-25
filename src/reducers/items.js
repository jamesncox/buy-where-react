import {
    SET_ITEMS,
    LOADING_ITEMS,
    CREATE_ITEM,
    ITEM_ERRORS,
    SET_ITEM_ID,
    UPDATE_ITEM,
    DELETE_ITEM,
    CLEAR_IS_ITEM_LOADING
} from '../actionTypes'

export default (state = {
    items: [],
    loading: false,
    errors: null,
    itemId: null
}, action) => {
    switch (action.type) {

        case LOADING_ITEMS:
            return { ...state, items: [...state.items], loading: true }

        case SET_ITEMS:
            return { ...state, items: action.payload, loading: false }

        case CREATE_ITEM:
            return { ...state, items: [...state.items, action.payload], loading: false }

        case ITEM_ERRORS:
            return { ...state, errors: action.payload }

        case SET_ITEM_ID:
            return { ...state, itemId: action.payload }

        case UPDATE_ITEM:
            const updatedItems = state.items.map((item, index) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        name: action.payload.name,
                        quantity: action.payload.quantity,
                        price: action.payload.price
                    }
                }
                return item
            })
            return { ...state, items: updatedItems, loading: false }

        case DELETE_ITEM:
            const persistedItems = state.items.filter(item => item.id !== action.payload.id)
            return { ...state, items: persistedItems }

        case CLEAR_IS_ITEM_LOADING:
            return { ...state, loading: false }

        default:
            return state
    }
}