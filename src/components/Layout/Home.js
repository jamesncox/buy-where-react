import React from 'react'
import { connect } from 'react-redux'
import WelcomeUser from '../User/WelcomeUser'
import Profile from './Profile'

function Home(props) {

    if (props.loggedIn === false) {
        return (
            <WelcomeUser />
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