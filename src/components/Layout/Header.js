import React from 'react'

import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import { clearCurrentUser } from '../../actions/users'
import { getToken } from '../../actions/sessions'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        display: "none",
        [theme.breakpoints.down('sm')]: {
            display: "block",
        }
    },
    title: {
        flexGrow: 1,
        marginLeft: "20rem",
        [theme.breakpoints.down('sm')]: {
            marginLeft: "0rem",
        }

    },
    userActions: {
        display: "block",
        [theme.breakpoints.down('sm')]: {
            display: "none",
        }
    },
}));

function Header(props) {
    const classes = useStyles();

    const handleLogout = () => {
        props.clearCurrentUser()
        props.getToken()
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    BUY / WHERE
                </Typography>
                <Button
                    className={classes.userActions}
                    color="inherit"
                    component={RouterLink}
                    to="/"
                >
                    Profile
                </Button>
                <Button
                    className={classes.userActions}
                    color="inherit"
                    component={RouterLink}
                    to="/SignIn"
                >
                    Sign In
                </Button>
                <Button
                    className={classes.userActions}
                    color="inherit"
                    component={RouterLink}
                    to="/SignUp"
                >
                    Sign Up
                </Button>
                <Button
                    className={classes.userActions}
                    onClick={handleLogout}
                    color="inherit"
                    component={RouterLink}
                    to="/LogOut"
                >
                    Log out
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default connect(null, { clearCurrentUser, getToken })(Header)