import {
    NEW_STORE_OPEN,
    NEW_STORE_CLOSE,
} from '../actionTypes'

export default (state = {
    // newItemOpen: false,
    isStoreOpen: false,
    // editStoreOpen: false,
}, action) => {
    switch (action.type) {
        case NEW_STORE_OPEN:
            return { isStoreOpen: true }

        case NEW_STORE_CLOSE:
            return { isStoreOpen: false }

        default:
            return state
    }
}