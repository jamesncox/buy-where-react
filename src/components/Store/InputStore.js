import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStore } from '../../actions/stores'

function InputStore(props) {

    const [name, setName] = useState("")
    const [storeType, setStoreType] = useState("")
    const [color, setColor] = useState("")

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleStoreType = (e) => {
        setStoreType(e.target.value)
    }

    const handleColor = (e) => {
        setColor(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const store = {
            name: name,
            storeType: storeType,
            color: color,
            userId: props.user.id
        }

        props.createStore(store)
        setName("")
        setStoreType("")
        setColor("")
    }

    return (
        <div>Input store form</div>
    )

}

const mapStateToProps = state => ({
    user: state.users.user
})

export default connect(mapStateToProps, { createStore })(InputStore)
