import {
    SET_STORES,
    LOADING_STORES,
    STORE_ERRORS,
    ADD_STORE
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

export const createStore = (store) => {

    return async (dispatch) => {

        const formData = {
            name: store.name,
            store_type: store.storeType,
            color: store.color,
            user_id: store.userId
        }

        const res = await fetch("http://localhost:3000/api/v1/stores", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })

        const storeObj = await res.json()
        // console.log(storeObj)

        if (storeObj.errors) {
            dispatch({ type: STORE_ERRORS, payload: storeObj.errors })
        } else {
            dispatch({ type: ADD_STORE, payload: storeObj })
        }
    }
}
