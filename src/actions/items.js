import {
    ITEM_ERRORS,
    ADD_ITEM,
    ADD_STORE
} from '../actionTypes'

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
            dispatch({ type: ITEM_ERRORS, payload: itemObj.errors })
        } else {
            dispatch({ type: ADD_ITEM, payload: itemObj })
            // dispatch({ type: ADD_STORE })
        }
    }
}