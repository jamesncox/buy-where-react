import {
    NEW_STORE_OPEN,
    NEW_STORE_CLOSE,
    NEW_ITEM_OPEN,
    NEW_ITEM_CLOSE,
    EDIT_STORE_OPEN,
    EDIT_STORE_CLOSE
} from '../actionTypes'

export default (state = {
    isNewItemOpen: false,
    isEditStoreOpen: false,
    isStoreOpen: false,
}, action) => {
    switch (action.type) {
        case NEW_STORE_OPEN:
            return { isStoreOpen: true }

        case NEW_STORE_CLOSE:
            return { isStoreOpen: false }

        case EDIT_STORE_OPEN:
            return { isEditStoreOpen: true }

        case EDIT_STORE_CLOSE:
            return { isEditStoreOpen: false }

        case NEW_ITEM_OPEN:
            return { isNewItemOpen: true }

        case NEW_ITEM_CLOSE:
            return { isNewItemOpen: false }

        default:
            return state
    }
}