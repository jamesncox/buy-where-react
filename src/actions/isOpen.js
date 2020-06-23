import {
    NEW_STORE_OPEN,
    NEW_STORE_CLOSE,
} from '../actionTypes'

export const newStoreOpen = () => {
    return { type: NEW_STORE_OPEN }
}

export const newStoreClose = () => {
    return { type: NEW_STORE_CLOSE }
}