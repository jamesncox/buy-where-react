import {
    SET_ITEMS,
    LOADING_ITEMS,
    SET_ERRORS,
    CREATE_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    CLEAR_IS_ITEM_LOADING
} from '../actionTypes'

const setItems = items => {
    return { type: SET_ITEMS, payload: items }
}

export const clearIsItemLoading = () => {
    return { type: CLEAR_IS_ITEM_LOADING }
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

        dispatch({ type: LOADING_ITEMS })

        const formData = {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            store_id: item.storeId
        }

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
            dispatch({ type: CREATE_ITEM, payload: itemObj })
        }
    }
}

export const editItem = (item) => {
    return async (dispatch) => {

        dispatch({ type: LOADING_ITEMS })

        const formData = {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            store_id: item.storeId,
        }

        const res = await fetch(`http://localhost:3000/api/v1/items/${item.itemId}`, {
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
            dispatch({ type: SET_ERRORS, payload: itemObj.errors })
        } else {
            dispatch({ type: UPDATE_ITEM, payload: itemObj })
        }
    }
}

export function deleteItem(id) {
    return (dispatch) => {
        fetch(`http://localhost:3000/api/v1/items/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(item => dispatch({ type: DELETE_ITEM, payload: item }))
    }
}
