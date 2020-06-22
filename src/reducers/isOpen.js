import {
    IS_NEW_ITEM_OPEN
} from '../actionTypes'

export default (state = { itemOpen: false }, action) => {
    switch (action.type) {
        case IS_NEW_ITEM_OPEN:
            return {
                itemOpen: true
            }
        default:
            return state
    }
}