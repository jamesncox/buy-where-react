import {
    NEW_STORE_OPEN,
    NEW_STORE_CLOSE,
    NEW_ITEM_OPEN,
    NEW_ITEM_CLOSE,
    EDIT_ITEM_OPEN,
    EDIT_ITEM_CLOSE
} from '../actionTypes'

export default (state = {
    isNewItemOpen: false,
    isEditItemOpen: false,
    isStoreOpen: false,
}, action) => {
    switch (action.type) {
        case NEW_STORE_OPEN:
            return { isStoreOpen: true }

        case NEW_STORE_CLOSE:
            return { isStoreOpen: false }

        case NEW_ITEM_OPEN:
            return { isNewItemOpen: true }

        case NEW_ITEM_CLOSE:
            return { isNewItemOpen: false }

        case EDIT_ITEM_OPEN:
            return { isEditItemOpen: true }

        case EDIT_ITEM_CLOSE:
            return { isEditItemOpen: false }

        default:
            return state
    }
}