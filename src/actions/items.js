import {
    SET_ITEMS,
    LOADING_ITEMS,
    SET_ERRORS,
    ADD_ITEM,
    ADD_ITEM_TO_STORE,
} from '../actionTypes'

const setItems = items => {
    return { type: SET_ITEMS, payload: items }
}

export const addItemToStore = (item) => {
    return { type: ADD_ITEM_TO_STORE, payload: item }
}

export const getItems = (id) => {
    return async dispatch => {

        dispatch({ type: LOADING_ITEMS })

        try {
            const res = await fetch(`http://localhost:3000/api/v1/user_items/${id}`)
            if (!res.ok) {
                throw res
            }
            const itemData = await res.json()
            dispatch(setItems(itemData))
        } catch (err) {
            console.log(err)
        }
    }
}

export const createItem = (item) => {
    return async (dispatch) => {

        const formData = {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            store_id: item.storeId
        }

        console.log(formData)

        const res = await fetch("http://localhost:3000/api/v1/items", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })

        const itemObj = await res.json()

        if (itemObj.errors) {
            dispatch({ type: SET_ERRORS, payload: itemObj.errors })
        } else {
            dispatch({ type: ADD_ITEM, payload: itemObj })
        }
    }
}

export const updateItem = (item, id) => {
    return async (dispatch) => {

        const formData = {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            store_id: item.storeId,
            id: id
        }

        const res = await fetch("http://localhost:3000/api/v1/items", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })

        const itemObj = await res.json()

        if (itemObj.errors) {
            alert(itemObj.errors)
            dispatch({ type: SET_ERRORS, payload: itemObj.errors })
        } else {
            dispatch({ type: ADD_ITEM, payload: itemObj })
        }
    }
}