import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createItem } from '../../actions/items'
import { getStores } from '../../actions/stores'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        margin: 'auto',
        color: theme.palette.text.secondary,
    },
    form: {
        margin: 'auto',
        width: '95%',
    },
    submit: {
        margin: theme.spacing(5, 0, 2),
    },
}))

function NewItem(props) {
    const classes = useStyles()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")

    // useEffect(() => {
    //     props.getStores()
    // })

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
            price: parseFloat(price).toFixed(2),
            quantity: parseInt(quantity),
            storeId: props.storeId
        }

        props.createItem(item)
        setName("")
        setPrice("")
        setQuantity("")
    }

    return (
        <Grid container className={classes.root}>
            <Typography className={classes.paper}>
                New Item
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
                        autoComplete="name"
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
                        autoComplete="quantity"
                        onChange={handleQuantity}
                        value={quantity}
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
                        id="price"
                        label="Item Price"
                        name="price"
                        autoComplete="price"
                        onChange={handlePrice}
                        value={price}
                        autoFocus
                    />
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Create Item
                </Button>
            </form>
        </Grid>
    )
}

const mapStateToProps = state => ({
    storeId: state.stores.storeId
})

export default connect(mapStateToProps, { createItem, getStores })(NewItem)