import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getStores } from '../../actions/stores'
import { clearErrors } from '../../actions/errors'
import { getItems } from '../../actions/items'
import { newStoreOpen, newStoreClose, newItemClose, editItemClose } from '../../actions/isOpen'
import StoresTable from '../Store/StoresTable'
import NewStore from '../Store/NewStore'
import Copyright from '../Layout/Copyright'

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    header: {
        fontSize: "3em",
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        marginTop: theme.spacing(2),
    },
    spinner: {
        margin: 'auto',
        display: 'flex',
        '& > * + *': {
            margin: 'auto',
        },
    },
    footer: {
        marginBottom: theme.spacing(2)
    }
}));

function Profile(props) {
    const classes = useStyles();

    const handleShow = () => {
        if (!props.isStoreOpen) {
            props.newStoreOpen()
            props.clearErrors()
        } else {
            props.newStoreClose()
            props.clearErrors()
            props.newItemClose()
            props.editItemClose()
        }
    }

    useEffect(() => {
        props.getStores(props.user.id)
        props.getItems(props.user.id)
    }, [])

    if (props.storesLoading === true) {
        return (
            <div className={classes.spinner}>
                <CircularProgress />
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
                    <Button className={classes.button} variant="contained" onClick={handleShow}>New Store</Button>
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
    storesLoading: state.stores.loading,
    isStoreOpen: state.isOpen.isStoreOpen
})

export default connect(mapStateToProps, {
    getStores,
    getItems,
    clearErrors,
    newStoreOpen,
    newStoreClose,
    newItemClose,
    editItemClose
})(Profile)