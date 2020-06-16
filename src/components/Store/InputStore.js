import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStore } from '../../actions/stores'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
// import { ColorPicker } from 'material-ui-color';
import { ColorPalette } from 'material-ui-color';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
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
}))

const palette = {
    crimson: 'crimson',
    maroon: 'maroon',
    orange: 'orange',
    darkGoldenRod: 'DarkGoldenRod',
    green: 'green',
    forestGreen: 'forestgreen',
    cyan: 'cyan',
    dodgerBlue: 'dodgerblue',
    darkBlue: 'darkblue',
    indigo: 'indigo',
    purple: 'purple',
    deepPink: 'deepPink',
    gray: 'gray',
    black: 'black',
}

function InputStore(props) {

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
        console.log(color)
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

    return (
        <Grid container component="main" className={classes.root}>
            <Grid className={classes.root}>
                <Typography className={classes.paper}>
                    Create Store
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
                        autoComplete="storeType"
                        onChange={handleStoreType}
                        value={storeType}
                        autoFocus
                    />
                    {/* <ColorPicker
                        defaultValue="Select store header color"
                        onClick={e => handleColor(e)}
                        autoFocus
                    /> */}
                    <Typography className={classes.paper}>
                        Select color for store header
                    </Typography>
                    <ColorPalette
                        palette={palette}
                        onSelect={e => handleColor(e)}
                        size={36}
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

const mapStateToProps = state => ({
    user: state.users.user
})

export default connect(mapStateToProps, { createStore })(InputStore)
