import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { editStore, deleteStore, clearIsStoreLoading } from '../../actions/stores'
import { editStoreClose } from '../../actions/isOpen'
import Errors from '../Layout/Errors'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LinearProgress from '@material-ui/core/LinearProgress';
import RemoveIcon from '@material-ui/icons/Remove'
import IconButton from '@material-ui/core/IconButton'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { ColorPalette } from 'material-ui-color';

function EditStore(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearIsStoreLoading())
    }, [dispatch])

    const selectedStore = props.stores.filter(store => store.id === props.storeId)

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
            padding: theme.spacing(1),
            margin: 'auto',
            textAlign: 'center',
            color: `${selectedStore[0].color}`,
            fontWeight: 'bold',
            opacity: "90%"
        },
        form: {
            margin: 'auto',
            width: '95%',
        },
        submit: {
            margin: theme.spacing(5, 0, 2),
        },
        loader: {
            margin: 'auto',
            padding: '5em',
        },
        progressBar: {
            height: "1.5em",
            backgroundColor: theme.palette.primary.main,
            borderRadius: "20px",

        },
        deleteIcon: {
            float: "right",
        }
    }))

    const palette = {
        crimson: 'crimson',
        maroon: 'maroon',
        orangeRed: 'orangeRed',
        darkOrange: 'darkOrange',
        goldenRod: 'goldenRod',
        limeGreen: 'limeGreen',
        seaGreen: 'seaGreen',
        mediumSeaGreen: 'mediumSeaGreen',
        darkTurquoise: 'darkTurquoise',
        deepSkyBlue: 'deepSkyBlue',
        dodgerBlue: 'dodgerblue',
        steelBlue: 'steelBlue',
        slateBlue: 'slateBlue',
        indigo: 'indigo',
        purple: 'purple',
        deepPink: 'deepPink',
        lightSlateGray: 'lightSlateGray',
        black: 'black',
    }

    const classes = useStyles()

    const [name, setName] = useState(selectedStore[0].name)
    const [storeType, setStoreType] = useState(selectedStore[0].store_type)
    const [color, setColor] = useState(selectedStore[0].color)

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
    }

    const handleDelete = (id) => {
        props.deleteStore(id)
        props.editStoreClose()
    }

    const handleClose = () => {
        props.editStoreClose()
    }

    if (props.errors) {
        return (
            <Errors />
        )
    } else if (props.loadingSingleStore) {
        return (
            <div className={classes.loader}>
                <Typography className={classes.header}>
                    Updating store...
                </Typography>
                <LinearProgress className={classes.progressBar} color="secondary" />
            </div>
        )
    } else {
        return (
            <Grid container component={Paper} className={classes.root} justify="space-between">
                <IconButton onClick={() => handleClose()}>
                    <RemoveIcon color="primary" />
                </IconButton>
                <Typography className={classes.header}>
                    EDIT {selectedStore[0].name.toUpperCase()}
                </Typography>
                <IconButton className={classes.deleteIcon} onClick={() => { if (window.confirm(`Are you sure you wish to delete ${selectedStore[0].name} and all of its items?`)) handleDelete(selectedStore[0].id) }}>
                    <DeleteForeverIcon color="primary" />
                </IconButton>

                {/* how do I get the following on a new "line"? */}
                {/* <Typography className={classes.paper}>
                    update store name, type and color
                    </Typography> */}

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
                    // autoFocus
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

                </form>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    errors: state.errors.errors,
    stores: state.stores.stores,
    storeId: state.stores.storeId,
    loadingSingleStore: state.stores.loadingSingleStore
})

export default connect(mapStateToProps, { editStore, deleteStore, clearIsStoreLoading, editStoreClose })(EditStore)