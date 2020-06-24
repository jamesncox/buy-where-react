import React, { useState } from 'react'
import { connect } from 'react-redux'
import Errors from '../Layout/Errors'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

function EditItem(props) {
    const selectedItem = props.items.filter(item => item.id === props.itemId)

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
            price: parseFloat(price).toFixed(2),
            quantity: parseInt(quantity),
            storeId: props.storeId
        }

        // props.editItem(item)
        setName("")
        setPrice("")
        setQuantity("")
    }

    if (props.errors) {
        return (
            <Errors />
        )
    } else {
        return (
            <Grid container className={classes.root}>
                <Typography className={classes.paper}>
                    EDIT {selectedItem[0].name.toUpperCase()}
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
                            color="secondary"
                            required
                            fullWidth
                            type="number"
                            id="quantity"
                            label={selectedItem[0].quantity}
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
                            color="secondary"
                            required
                            fullWidth
                            type="number"
                            id="price"
                            label={selectedItem[0].price}
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
                        color="secondary"
                        className={classes.submit}
                    >
                        Create Item
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
    itemId: state.items.itemId
})

export default connect(mapStateToProps)(EditItem)