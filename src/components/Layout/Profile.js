import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getStores } from '../../actions/stores'

function Profile(props) {

    useEffect(() => {
        props.getStores()
    })

    return (
        <p>
            Hi, {props.user.username}. Create a list.
        </p>
    )
}

const mapStateToProps = state => ({
    user: state.users.user
})

export default connect(mapStateToProps, { getStores })(Profile)