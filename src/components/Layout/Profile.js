import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getStores } from '../../actions/stores'
import Stores from '../Store/Stores'
import InputStore from '../Store/InputStore'
import Copyright from '../Layout/Copyright'

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

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
        fontSize: "2em",
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

function Profile(props) {

    const classes = useStyles();

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
                <Typography className={classes.paper}>
                    View your saved shopping records
                </Typography>
                <Grid item xs={12}>
                    <InputStore />
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