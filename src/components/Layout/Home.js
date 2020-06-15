import React from 'react'
import { connect } from 'react-redux'
import SignInMessage from '../User/SignInMessage'
import Profile from './Profile'

function Home(props) {

    if (props.loggedIn === false) {
        return (
            <SignInMessage />
        )
    } else {
        return (
            <Profile />
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.users.loggedIn
})

export default connect(mapStateToProps)(Home)