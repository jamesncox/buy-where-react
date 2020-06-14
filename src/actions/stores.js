import {
    SET_STORES,
    LOADING_STORES
} from '../actionTypes'

const setStores = stores => {
    return { type: SET_STORES, payload: stores }
}

export const getStores = () => {
    return async dispatch => {
        dispatch({ type: LOADING_STORES })
        try {
            const res = await fetch("http://localhost:3000/api/v1/stores")
            if (!res.ok) {
                throw res
            }
            const storeData = await res.json()
            dispatch(setStores(storeData))
        } catch (err) {
            console.log(err)
        }
    }
}