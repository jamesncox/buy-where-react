import {
    SET_ITEMS,
    LOADING_ITEMS,
    ADD_ITEM,
    ITEM_ERRORS,
    SET_ITEM_ID,
    UPDATE_ITEM
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

        case ADD_ITEM:
            return { ...state, items: [...state.items, action.payload] }

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
            return { ...state, items: updatedItems }

        default:
            return state
    }
}