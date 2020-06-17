import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createItem } from '../../actions/items'

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
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    form: {
        margin: 'auto',
        width: '90%',
    },
    submit: {
        margin: theme.spacing(5, 0, 2),
    },
}))

function NewItem(props) {
    const classes = useStyles()

    const [name, setName] = useState("")
    const [price, setPrice] = useState(null)
    const [quantity, setQuantity] = useState(null)

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
            price: price,
            quantity: quantity,
            storeId: props.store.id
        }

        props.createItem(item)
        setName("")
        setPrice(null)
        setQuantity(null)
    }

    return (
        <Grid className={classes.root}>
            <Typography className={classes.paper}>
                Create Item
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
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="quantity"
                        label="Item quantity"
                        name="quantity"
                        autoComplete="quantity"
                        onChange={handleQuantity}
                        value={quantity}
                        autoFocus
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
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
    store: state.stores.store
})

export default connect(mapStateToProps, { createItem })(NewItem)