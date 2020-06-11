import React from 'react'
import { connect } from 'react-redux'

function SignInSuccess(props) {
    if (props.user) {
        return (
            <p>Welcome back, {props.user.username}! Let's keep doing great things!</p>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    errors: state.users.errors,
    loggedIn: state.users.loggedIn
})

export default connect(mapStateToProps)(SignInSuccess)