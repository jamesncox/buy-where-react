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
        marginRight: theme.spacing(22),
    },
    title: {
        flexGrow: 1
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
                    Store Spender
                </Typography>
                <Button color="inherit" component={RouterLink} to="/Login">Login</Button>
                <Button color="inherit" component={RouterLink} to="/Signup">Sign up</Button>
                <Button onClick={handleLogout} color="inherit">Log out</Button>
            </Toolbar>
        </AppBar>
    )
}

export default connect(null, { clearCurrentUser, getToken })(Header)