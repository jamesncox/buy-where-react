import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getStores } from '../../actions/stores'
import Stores from '../Store/Stores'
import NewStore from '../Store/NewStore'
import Copyright from '../Layout/Copyright'

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginBottom: "-1em"
    },
    header: {
        fontSize: "2em",
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

function Profile(props) {
    const classes = useStyles();
    const [showNewStore, setShowNewStore] = useState(false)

    const handleShow = () => {
        if (!showNewStore) {
            setShowNewStore(true)
        } else {
            setShowNewStore(false)
        }
    }

    useEffect(() => {
        props.getStores()
    }, [])

    if (props.storesLoading === true) {
        return (
            <p>Stores Loading...</p>
        )
    } else {
        return (
            <div className={classes.root}>
                {/* The className array example below is not valid, not sure proper syntax */}
                <Typography className={classes.header}>
                    Hello, {props.user.username}.
                </Typography>
                <Grid item xs={12}>
                    <Button className={classes.button} variant="contained" onClick={handleShow}>New Store</Button>
                    {showNewStore ? <NewStore /> : null}
                    <Typography className={classes.paper}>
                        Your saved shopping records
                    </Typography>
                    <Stores />
                </Grid>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    storesLoading: state.stores.loading
})

export default connect(mapStateToProps, { getStores })(Profile)