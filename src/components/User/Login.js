import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/users'
import { Redirect } from 'react-router-dom'

class Login extends Component {

    state = {
        username: '',
        password: '',
        shouldRedirect: false
    }

    handleChange = (e) => {
        console.log(e.target.name)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = e => {
        e.preventDefault()
        this.props.loginUser(this.state)
        this.setState({
            username: '',
            password: ''
        })
    }

    render() {
        return (
            <>
                <h1>Login</h1>
                <form onSubmit={e => this.handleLogin(e)}>
                    <label>Username: </label>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={this.state.username}
                        onChange={e => this.handleChange(e)}
                    />
                    <label>Password: </label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={e => this.handleChange(e)}
                    />
                    <input type="submit" value="Login" />
                </form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    errors: state.users.errors,
    loggedIn: state.users.loggedIn
})

export default connect(mapStateToProps, { loginUser })(Login)