import {
    SET_ITEMS,
    LOADING_ITEMS,
    ADD_ITEM,
    ITEM_ERRORS
} from '../actionTypes'

export default (state = {
    items: [],
    loading: false,
    errors: null
}, action) => {
    switch (action.type) {

        case LOADING_ITEMS:
            return { ...state, items: [...state.items], loading: true }

        case SET_ITEMS:
            console.log(action.payload)
            return { ...state, items: action.payload, loading: false }

        case ADD_ITEM:
            return { ...state, items: [...state.items, action.payload] }

        case ITEM_ERRORS:
            return { ...state, errors: action.payload }

        default:
            return state
    }
}