import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getStores } from '../../actions/stores'
import Stores from '../Store/Stores'

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
        marginTop: theme.spacing(2)
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
                <Typography className={[classes.header, classes.paper]}>
                    Hello, {props.user.username}.
                </Typography>
                <Typography className={classes.paper}>
                    View your saved shopping records
                </Typography>
                <Grid item xs={12}>
                    <Stores />
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    storesLoading: state.stores.loading
})

export default connect(mapStateToProps, { getStores })(Profile)