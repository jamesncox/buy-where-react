import React from 'react'
import { connect } from 'react-redux'
import SignInPrompt from '../User/SignInPrompt'
import Profile from './Profile'

function Home(props) {

    if (props.loggedIn === false) {
        return (
            <SignInPrompt />
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