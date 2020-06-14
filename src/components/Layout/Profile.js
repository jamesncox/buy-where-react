import React from 'react'
import { connect } from 'react-redux'

function Profile(props) {

    return (
        <p>
            Hi, {props.user.username}. Create a list.
        </p>
    )
}

const mapStateToProps = state => ({
    user: state.users.user
})

export default connect(mapStateToProps)(Profile)