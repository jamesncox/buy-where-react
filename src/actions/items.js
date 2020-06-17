import {
    ITEM_ERRORS,
    ADD_ITEM
} from '../actionTypes'

export const createItem = (item) => {

    return async (dispatch) => {

        const formData = {
            name: item.name,
            price: item.price,
            color: item.quantity,
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
        // console.log(storeObj)

        if (itemObj.errors) {
            dispatch({ type: ITEM_ERRORS, payload: itemObj.errors })
        } else {
            dispatch({ type: ADD_ITEM, payload: itemObj })
        }
    }
}