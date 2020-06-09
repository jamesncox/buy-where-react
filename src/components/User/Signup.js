import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signupUser } from '../../actions/users'

class Signup extends Component {

    state = {
        username: '',
        password: '',
        password_confirmation: '',
        shouldRedirect: false
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSignup = e => {
        e.preventDefault()
        this.props.signupUser(this.props.token, this.state)
        this.setState({
            username: '',
            password: '',
            password_confirmation: ''
        })
    }

    render() {
        return (
            <>
                <h1>Sign up</h1>
                <form onSubmit={this.handleSignup.bind(this)}>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={this.state.username}
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={e => this.handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Password confirmation"
                        name="password_confirmation"
                        value={this.state.password_confirmation}
                        onChange={e => this.handleChange(e)}
                    />
                    <input type="submit" value="Sign up" />
                </form>
            </>

        )
    }

}


const mapStateToProps = state => ({
    user: state.users.user,
    errors: state.users.errors,
    token: state.sessions.token,
    loggedIn: state.users.loggedIn
})

export default connect(mapStateToProps, { signupUser })(Signup)