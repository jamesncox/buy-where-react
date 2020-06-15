import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core';
import { getStores } from '../../actions/stores'
import Stores from './Stores'

function Profile(props) {

    useEffect(() => {
        props.getStores()
    }, [])

    if (props.storesLoading === true) {
        return (
            <p>Stores Loading...</p>
        )
    } else {
        return (
            <Typography>
                <h1>Hello, {props.user.username}.</h1>
                <p>View your saved shopping records</p>
                <Stores />
            </Typography>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    storesLoading: state.stores.loading
})

export default connect(mapStateToProps, { getStores })(Profile)