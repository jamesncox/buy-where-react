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
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
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

function ScrollTop(props) {
    const { children } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        // target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleScrollClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleScrollClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

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

    if (props.loggedIn === false) {
        return (
            <>
                <CssBaseline />
                <AppBar>
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
                    </Toolbar>
                </AppBar>
                <Toolbar id="back-to-top-anchor" />
                <ScrollTop {...props}>
                    <Fab color="secondary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
            </>
        )
    } else {
        return (
            <>
                <CssBaseline />
                <AppBar>
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
                            onClick={handleLogout}
                            color="inherit"
                            component={RouterLink}
                            to="/LogOut"
                        >
                            Log out
                    </Button>
                    </Toolbar>
                </AppBar>
                <Toolbar id="back-to-top-anchor" />
                <ScrollTop {...props}>
                    <Fab color="secondary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
            </>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.users.loggedIn
})

export default connect(mapStateToProps, { clearCurrentUser, getToken })(Header)