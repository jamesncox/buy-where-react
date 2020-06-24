import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStore } from '../../actions/stores'
import Errors from '../Layout/Errors'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { ColorPalette } from 'material-ui-color';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "40%",
        margin: 'auto',
        marginTop: '2em',
        [theme.breakpoints.down('md')]: {
            width: "60%",
        },
        [theme.breakpoints.down('sm')]: {
            width: "80%",
        },
        [theme.breakpoints.down('xs')]: {
            width: "98%",
        },
    },
    newStore: {
        margin: 'auto',
        width: '95%',
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(5, 0, 2),
    },
}))

const palette = {
    crimson: 'crimson',
    maroon: 'maroon',
    orangeRed: 'orangeRed',
    orange: 'orange',
    darkOrange: 'darkOrange',
    darkGoldenRod: 'DarkGoldenRod',
    forestGreen: 'forestGreen',
    mediumSeaGreen: 'mediumSeaGreen',
    darkTurquoise: 'darkTurquoise',
    deepSkyBlue: 'deepSkyBlue',
    dodgerBlue: 'dodgerblue',
    darkBlue: 'darkblue',
    darkSlateBlue: 'darkSlateBlue',
    indigo: 'indigo',
    purple: 'purple',
    deepPink: 'deepPink',
    gray: 'gray',
    black: 'black',
}

function NewStore(props) {

    const classes = useStyles()

    const [name, setName] = useState("")
    const [storeType, setStoreType] = useState("")
    const [color, setColor] = useState("")

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleStoreType = (e) => {
        setStoreType(e.target.value)
    }

    const handleColor = (color) => {
        setColor(color)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const store = {
            name: name,
            storeType: storeType,
            color: color,
            userId: props.user.id
        }

        props.createStore(store)
        setName("")
        setStoreType("")
        setColor("")
    }

    if (props.errors) {
        return (
            <Errors />
        )
    } else {
        return (
            <Grid container component={Paper} className={classes.root}>
                <Grid className={classes.newStore}>
                    <Typography className={classes.paper}>
                        Add New Store
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={e => handleSubmit(e)}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Store Name"
                            name="name"
                            autoComplete="name"
                            onChange={handleName}
                            value={name}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="storeType"
                            label="Store Type (e.g. grocery)"
                            name="storeType"
                            onChange={handleStoreType}
                            value={storeType}
                        />
                        <Typography className={classes.paper}>
                            select color for store header
                        </Typography>
                        <ColorPalette
                            palette={palette}
                            onSelect={e => handleColor(e)}
                            size={31}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Create Store
                    </Button>
                    </form>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    errors: state.errors.errors
})

export default connect(mapStateToProps, { createStore })(NewStore)
