import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createItem } from '../../actions/items'

function NewItem(props) {

    const [name, setName] = useState("")
    const [price, setPrice] = useState(null)
    const [quantity, setQuantity] = useState(null)

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handlePrice = (e) => {
        setPrice(e.target.value)
    }

    const handleQuantity = (e) => {
        setQuantity(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const item = {
            name: name,
            price: price,
            quantity: quantity,
            storeId: props.store.id
        }

        props.createItem(item)
        setName("")
        setPrice(null)
        setQuantity(null)
    }

    return (
        <div>
            <p> new item form </p>
        </div>
    )
}

const mapStateToProps = state => ({
    store: state.stores.store
})

export default connect(mapStateToProps, { crateItem })(NewItem)