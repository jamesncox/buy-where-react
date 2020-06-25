import {
    SET_STORES,
    LOADING_STORES,
    SET_ERRORS,
    CREATE_STORE,
    UPDATE_STORE,
    DELETE_STORE,
    LOADING_SINGLE_STORE,
    CLEAR_IS_STORE_LOADING
} from '../actionTypes'

const setStores = stores => {
    return { type: SET_STORES, payload: stores }
}

export const clearIsStoreLoading = () => {
    return { type: CLEAR_IS_STORE_LOADING }
}

export const getStores = (id) => {
    return async dispatch => {

        dispatch({ type: LOADING_STORES })

        try {
            const res = await fetch(`http://localhost:3000/api/v1/user_stores/${id}`)
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

        dispatch({ type: LOADING_SINGLE_STORE })

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

        if (storeObj.errors) {
            dispatch({ type: SET_ERRORS, payload: storeObj.errors })
        } else {
            dispatch({ type: CREATE_STORE, payload: storeObj })
        }
    }
}

export const editStore = (store) => {

    return async (dispatch) => {

        dispatch({ type: LOADING_SINGLE_STORE })

        const formData = {
            name: store.name,
            store_type: store.storeType,
            color: store.color,
            user_id: store.userId
        }

        const res = await fetch(`http://localhost:3000/api/v1/stores/${store.storeId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })

        const storeObj = await res.json()

        if (storeObj.errors) {
            dispatch({ type: SET_ERRORS, payload: storeObj.errors })
        } else {
            dispatch({ type: UPDATE_STORE, payload: storeObj })
        }
    }
}

export function deleteStore(id) {
    return (dispatch) => {
        fetch(`http://localhost:3000/api/v1/stores/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(store => dispatch({ type: DELETE_STORE, payload: store }))
    }
}
