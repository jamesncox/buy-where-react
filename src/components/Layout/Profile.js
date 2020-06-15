import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { getStores } from '../../actions/stores'

function Profile(props) {
    // const dispatch = useDispatch();

    useEffect(() => {
        props.getStores()
    }, [])

    if (props.storesLoading === true) {
        return (
            <p>Stores Loading...</p>
        )
    } else {
        return (
            <p>
                Hi, {props.user.username}. Create a list.
            </p>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    storesLoading: state.stores.loading
})

export default connect(mapStateToProps, { getStores })(Profile)