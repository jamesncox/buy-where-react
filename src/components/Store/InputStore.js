import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStore } from '../../actions/stores'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    form: {
        width: '25%',
        marginTop: theme.spacing(1)
    }
}))

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

    const handleColor = (e) => {
        setColor(e.target.value)
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
        <Grid className={classes.root}>
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
            </form>
        </Grid>
    )

}

const mapStateToProps = state => ({
    user: state.users.user
})

export default connect(mapStateToProps, { createStore })(InputStore)
