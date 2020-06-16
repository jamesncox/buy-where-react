import React from 'react'
import { connect } from 'react-redux'
import { createStore } from '../../actions/stores'

function InputStore(props) {

    const handleSubmit = (e) => {
        e.preventDefault()

        // const text = this.state.text
        // const rating = this.state.rating
        // const userId = this.props.user.id
        // const captionObj = { text, rating, userId }
        // const storeObj = { name, storeType, color, userId }
        // props.createStore(storeObj)
        // this.setState({
        //     text: '',
        //     rating: 'PG'
        // })

    }

    return (
        <div>Input store form</div>
    )

}

// export default connect({ createStore })(InputStore)
export default InputStore