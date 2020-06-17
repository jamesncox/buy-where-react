import {
    ADD_ITEM,
    ITEM_ERRORS
} from '../actionTypes'

export default (state = {
    items: [],
    loading: true,
    errors: null
}, action) => {
    switch (action.type) {

        case ADD_ITEM:
            return { ...state, items: [...state.items, action.payload] }

        case ITEM_ERRORS:
            return { ...state, errors: action.payload }

        default:
            return state
    }
}