import {
    NEW_STORE_OPEN,
    NEW_STORE_CLOSE,
} from '../actionTypes'

export default (state = {
    newItemOpen: false,
    newStoreOpen: false,
    editStoreOpen: false,
}, action) => {
    switch (action.type) {
        case NEW_STORE_OPEN:
            return { newStoreOpen: true }

        case NEW_STORE_CLOSE:
            return { newStoreOpen: false }

        default:
            return state
    }
}