import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { getStores } from '../../actions/stores'
import { clearErrors } from '../../actions/errors'
import { getItems } from '../../actions/items'
import {
    newStoreOpen,
    newStoreClose,
    newItemClose,
    editStoreClose,
    editItemClose
} from '../../actions/isOpen'
import StoresTable from '../Store/StoresTable'
import NewStore from '../Store/NewStore'
import Copyright from '../Layout/Copyright'

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        [theme.breakpoints.down('xs')]: {
            fontSize: "1em"
        },
    },
    header: {
        fontSize: "3em",
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        [theme.breakpoints.down('sm')]: {
            fontSize: "2em"
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "1.75em"
        },
    },
    button: {
        marginTop: theme.spacing(2),
    },
    loader: {
        margin: 'auto',
        padding: '5em',
    },
    progressBar: {
        margin: 'auto',
        height: '1em',
        width: '20em',
        [theme.breakpoints.down('sm')]: {
            width: "50%"
        },
        [theme.breakpoints.down('xs')]: {
            width: "75%"
        },
    }
}));

function Profile(props) {
    const dispatch = useDispatch()
    const classes = useStyles();

    const handleShow = () => {
        if (!props.isStoreOpen) {
            props.newStoreOpen()
            props.clearErrors()
        } else {
            props.newStoreClose()
            props.clearErrors()
            props.newItemClose()
            props.editStoreClose()
            props.editItemClose()
        }
    }

    useEffect(() => {
        dispatch(getStores(props.user.id))
        dispatch(getItems(props.user.id))
    }, [dispatch, props.user.id])

    if (props.loadingStores) {
        return (
            <div className={classes.loader}>
                <Typography className={classes.paper}>
                    Loading your stores...
                </Typography>
                <LinearProgress className={classes.progressBar} color="secondary" />
            </div>
        )
    } else if (props.user.username.slice(0, 5) === "Guest") {
        return (
            <div className={classes.root}>
                <Typography className={classes.header}>
                    Welcome, Mysterious Traveller
                </Typography>
                <Typography className={classes.paper}>
                    Track your spending. Create stores. Add items.
                </Typography>
                <Grid item xs={12}>
                    <Button className={classes.button} variant="contained" color="primary" onClick={handleShow}>New Store</Button>
                    {props.isStoreOpen ? <NewStore /> : null}
                    <StoresTable />
                </Grid>
                <Box mt={5} className={classes.footer}>
                    <Copyright />
                </Box>
            </div>
        )
    } else {
        return (
            <div className={classes.root}>
                <Typography className={classes.header}>
                    Hello, {props.user.username}.
                </Typography>
                <Typography className={classes.paper}>
                    Track your spending. Create stores. Add items.
                </Typography>
                <Grid item xs={12}>
                    <Button className={classes.button} variant="contained" color="primary" onClick={handleShow}>New Store</Button>
                    {props.isStoreOpen ? <NewStore /> : null}
                    <StoresTable />
                </Grid>
                <Box mt={5} className={classes.footer}>
                    <Copyright />
                </Box>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    loadingStores: state.stores.loadingStores,
    isStoreOpen: state.isOpen.isStoreOpen
})

export default connect(mapStateToProps, {
    getStores,
    getItems,
    clearErrors,
    newStoreOpen,
    newStoreClose,
    newItemClose,
    editStoreClose,
    editItemClose
})(Profile)