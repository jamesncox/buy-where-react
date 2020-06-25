import React, { useState } from 'react'
import { connect } from 'react-redux'
import { editStore } from '../../actions/stores'
import Errors from '../Layout/Errors'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { ColorPalette } from 'material-ui-color';

function EditStore(props) {

    const selectedStore = props.stores.filter(store => store.id === props.storeId)

    const useStyles = makeStyles((theme) => ({
        root: {
            width: "100%",
            margin: 'auto',
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
        header: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: `${selectedStore[0].color}`,
            fontWeight: 'bold',
            opacity: "60%"
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1)
        },
        submit: {
            margin: theme.spacing(5, 0, 2),
        },
        delete: {
            margin: theme.spacing(2),
            width: "1em",
        },
    }))

    const palette = {
        crimson: 'crimson',
        maroon: 'maroon',
        orangeRed: 'orangeRed',
        orange: 'orange',
        darkOrange: 'darkOrange',
        darkGoldenRod: 'DarkGoldenRod',
        green: 'green',
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
            userId: props.user.id,
            storeId: props.storeId
        }

        props.editStore(store)
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
                    <Typography className={classes.header}>
                        EDIT {selectedStore[0].name.toUpperCase()}
                    </Typography>
                    <Typography className={classes.paper}>
                        update store name, type and color
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={e => handleSubmit(e)}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            color="secondary"
                            required
                            fullWidth
                            id="name"
                            label={selectedStore[0].name}
                            name="name"
                            onChange={handleName}
                            value={name}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            color="secondary"
                            required
                            fullWidth
                            id="storeType"
                            label={selectedStore[0].store_type}
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
                            color="secondary"
                            className={classes.submit}
                        >
                            Submit Changes
                        </Button>
                        {/* <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.delete}
                        >
                            <DeleteForeverIcon fontSize="small" />
                        </Button> */}
                    </form>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    errors: state.errors.errors,
    stores: state.stores.stores,
    storeId: state.stores.storeId,
})

export default connect(mapStateToProps, { editStore })(EditStore)