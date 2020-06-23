import {
    NEW_ITEM_OPEN,
    NEW_STORE_OPEN,
    EDIT_STORE_OPEN
} from '../actionTypes'

export default (state = {
    newItemOpen: false,
    newStoreOpen: false,
    editStoreOpen: false,
}, action) => {
    switch (action.type) {
        case NEW_ITEM_OPEN:
            return { newItemOpen: true }

        case NEW_STORE_OPEN:
            return { newStoreOpen: true }

        case EDIT_STORE_OPEN:
            return { editStoreOpen: true }

        default:
            return state
    }
}