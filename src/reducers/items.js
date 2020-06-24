import {
    SET_ITEMS,
    LOADING_ITEMS,
    ADD_ITEM,
    ITEM_ERRORS,
    SET_ITEM_ID
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

        default:
            return state
    }
}