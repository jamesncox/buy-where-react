import React from 'react'
import { connect } from 'react-redux'
import WelcomeUser from '../User/WelcomeUser'
import MyStores from './MyStores'

function Home(props) {

    if (props.loggedIn === false) {
        return (
            <WelcomeUser />
        )
    } else {
        return (
            <MyStores />
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.users.loggedIn
})

export default connect(mapStateToProps)(Home)