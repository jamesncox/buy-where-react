import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { createItem, clearIsItemLoading } from '../../actions/items'
import Errors from '../Layout/Errors'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'



function NewItem(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearIsItemLoading())
    }, [dispatch])

    const selectedStore = props.stores.filter(store => store.id === props.storeId)

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        header: {
            padding: theme.spacing(1),
            margin: 'auto',
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
            storeId: props.storeId
        }

        props.createItem(item)
        setName("")
        setPrice("")
        setQuantity("")
    }

    if (props.errors) {
        return (
            <Errors />
        )
    } else if (props.loading) {
        return (
            <div className={classes.loader}>
                <Typography className={classes.header}>
                    Adding item to list...
                </Typography>
                <LinearProgress className={classes.progressBar} color="secondary" />
            </div>
        )
    } else {
        return (
            <Grid container className={classes.root} >
                <Typography className={classes.header}>
                    NEW {selectedStore[0].name.toUpperCase()} PURCHASE
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
                            required
                            fullWidth
                            id="name"
                            label="Item Name"
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
                            required
                            fullWidth
                            type="number"
                            id="quantity"
                            label="Item quantity"
                            name="quantity"
                            onChange={handleQuantity}
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type="number"
                            id="price"
                            label="Item Price"
                            name="price"
                            onChange={handlePrice}
                            value={price}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        ADD
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
    loading: state.items.loading
})

export default connect(mapStateToProps, { createItem, clearIsItemLoading })(NewItem)