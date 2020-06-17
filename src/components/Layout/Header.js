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

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        props.clearCurrentUser()
        props.getToken()
    }

    const handleBoth = () => {
        handleLogout()
        handleClose()
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        component={RouterLink}
                        to="/"
                        onClick={handleClose}
                    >
                        My Stores
                    </MenuItem>
                    <MenuItem
                        component={RouterLink}
                        to="/SignIn"
                        onClick={handleClose}
                    >
                        Sign In
                    </MenuItem>
                    <MenuItem
                        component={RouterLink}
                        to="/SignUp"
                        onClick={handleClose}
                    >
                        Sign Up
                    </MenuItem>
                    <MenuItem
                        component={RouterLink}
                        to="/LogOut"
                        onClick={handleBoth}
                    >
                        Log Out
                    </MenuItem>

                </Menu>
                <Typography variant="h6" className={classes.title}>
                    BUY / WHERE
                </Typography>
                <Button
                    className={classes.userActions}
                    color="inherit"
                    component={RouterLink}
                    to="/"
                >
                    My Stores
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