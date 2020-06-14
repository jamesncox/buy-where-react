import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getStores } from '../../actions/stores'

function Profile(props) {

    useEffect(() => {
        props.getStores()
    })

    const mapStores = () => {
        return console.log(props.stores)
    }

    return (
        <p>
            Hi, {props.user.username}. Create a list.
            {mapStores()}
        </p>
    )
}

const mapStateToProps = state => ({
    user: state.users.user,
    stores: state.stores.stores
})

export default connect(mapStateToProps, { getStores })(Profile)