import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import Errors from '../Layout/Errors'
import { editItem, deleteItem, clearIsItemLoading } from '../../actions/items'
import { editItemClose } from '../../actions/isOpen'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

function EditItem(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearIsItemLoading())
    }, [dispatch])

    const selectedStore = props.stores.filter(store => store.id === props.storeId)
    const selectedItem = props.items.filter(item => item.id === props.itemId)

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        // paper: {
        //     padding: theme.spacing(1),
        //     margin: 'auto',
        //     color: theme.palette.text.secondary,
        // },
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
            height: ".75em"
        }
    }))

    const classes = useStyles()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handlePrice = (e) => {
        setPrice(e.target.value)
    }

    const handleQuantity = (e) => {
        setQuantity(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const item = {
            name: name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            storeId: props.storeId,
            itemId: props.itemId
        }

        props.editItem(item)
        setName("")
        setPrice("")
        setQuantity("")
    }

    const handleDelete = (id) => {
        props.deleteItem(id)
        props.editItemClose()
    }

    function itemFormat(words) {
        return words
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    if (props.errors) {
        return (
            <Errors />
        )
    } else if (props.loading) {
        return (
            <div className={classes.loader}>
                <Typography className={classes.header}>
                    Updating item...
                </Typography>
                <LinearProgress className={classes.progressBar} color="secondary" />

            </div>
        )
    } else {
        return (
            <Grid container className={classes.root}>
                <Typography className={classes.header}>
                    Edit {itemFormat(selectedItem[0].name)} From {itemFormat(selectedStore[0].name)}
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={e => handleSubmit(e)}
                >
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            color="secondary"
                            required
                            fullWidth
                            id="name"
                            label={selectedItem[0].name}
                            name="name"
                            onChange={handleName}
                            value={name}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            color="secondary"
                            required
                            fullWidth
                            type="number"
                            id="quantity"
                            label="quantity"
                            onChange={handleQuantity}
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            color="secondary"
                            required
                            fullWidth
                            type="number"
                            id="price"
                            label="price"
                            onChange={handlePrice}
                            value={price}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Edit Item
                    </Button>
                    <Button color="primary">
                        <DeleteForeverIcon fontSize="large" onClick={() => { if (window.confirm(`Are you sure you wish to delete ${selectedItem[0].name}?`)) handleDelete(selectedItem[0].id) }} />
                    </Button>
                </form>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    storeId: state.stores.storeId,
    errors: state.errors.errors,
    stores: state.stores.stores,
    items: state.items.items,
    itemId: state.items.itemId,
    loading: state.items.loading
})

export default connect(mapStateToProps, { editItem, deleteItem, editItemClose, clearIsItemLoading })(EditItem)