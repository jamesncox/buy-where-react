import {
    NEW_ITEM_OPEN,
    NEW_ITEM_CLOSE,
    NEW_STORE_OPEN,
    NEW_STORE_CLOSE,
    EDIT_STORE_OPEN,
    EDIT_STORE_CLOSE
} from '../actionTypes'

export default (state = {
    newItemOpen: false,
    newStoreOpen: false,
    editStoreOpen: false,
}, action) => {
    switch (action.type) {
        case NEW_ITEM_OPEN:
            return { newItemOpen: true }

        case NEW_ITEM_CLOSE:
            return { newItemOpen: false }

        case NEW_STORE_OPEN:
            return { newStoreOpen: true }

        case NEW_STORE_CLOSE:
            return { newStoreOpen: false }

        case EDIT_STORE_OPEN:
            return { editStoreOpen: true }

        case EDIT_STORE_CLOSE:
            return { editStoreOpen: false }

        default:
            return state
    }
}