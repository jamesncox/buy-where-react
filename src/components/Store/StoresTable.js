import React, { useState } from 'react'
import { connect } from 'react-redux'
import { SET_STORE_ID, CLEAR_ERRORS } from '../../actionTypes'
import NewItem from '../Item/NewItem'
import NoStoresYet from '../Layout/NoStoreYet'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddBoxIcon from '@material-ui/icons/AddBox';

const TAX_RATE = 0.085;

const useStyles = makeStyles((theme) => ({
    container: {
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
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        fontSize: "2em",
        fontFamily: 'Raleway, Arial',
    },
    table: {
        width: "100%",
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "white",
        textAlign: "left",
    },
    units: {
        fontWeight: "bold",
        color: "rgba(0, 0, 0, 0.65)"
    },
    storeType: {
        color: "white"
    },
    addIcon: {
        color: "rgba(255, 255, 255, 0.9)",
        float: "left",
        cursor: "pointer",
    },
    editIcon: {
        cursor: "pointer",
        color: "rgba(0, 0, 0, 0.4)",
    },
    iconColumn: {
        width: 1
    },
    invoiceStyles: {
        fontWeight: "bold",
        color: "rgba(0, 0, 0, 0.65)"
    }
}));

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function itemFormat(words) {
    return words
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function subtotal(items) {
    return items.map(item => item.price * item.quantity).reduce((sum, i) => sum + i, 0);
}

function Stores(props) {
    const classes = useStyles();

    const [showNewItem, setShowNewItem] = useState(false)

    const handleShow = (id) => {
        if (!showNewItem) {
            setShowNewItem(showNewItem === id ? true : id)
            props.setStoreId(id)
            props.clearErrors()
        } else {
            setShowNewItem(showNewItem === id ? false : id)
            props.setStoreId(id)
            props.clearErrors()
        }
    }

    const renderStoreTable = (id) => {
        const userStores = props.stores.filter(store => store.user_id === id).reverse()
        return (
            userStores.map(store => {
                const userItems = props.items.filter(item => item.store_id === store.id)
                const invoiceSubtotal = subtotal(userItems);
                const invoiceTaxes = TAX_RATE * invoiceSubtotal;
                const invoiceTotal = invoiceTaxes + invoiceSubtotal;
                return (
                    <TableContainer key={store.id} className={classes.container} component={Paper}>
                        {showNewItem === store.id ? <NewItem /> : null}
                        <Table className={classes.table} aria-label="spanning table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: `${store.color}` }}>
                                    <TableCell>
                                        <AddBoxIcon className={classes.addIcon} fontSize="large" onClick={() => handleShow(store.id)} />
                                    </TableCell>
                                    <TableCell align="right" className={classes.title} colSpan={2}>
                                        {(store.name).toUpperCase()}
                                    </TableCell>
                                    <TableCell align="right" className={classes.storeType}>{(store.store_type).toUpperCase()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.units}>Item</TableCell>
                                    <TableCell className={classes.units} align="right">Qty.</TableCell>
                                    <TableCell className={classes.units} align="right">Cost</TableCell>
                                    <TableCell className={classes.units} align="right">Sum</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{itemFormat(item.name)}</TableCell>
                                        <TableCell align="right">{item.quantity}</TableCell>
                                        <TableCell align="right">${ccyFormat(item.price)}</TableCell>
                                        <TableCell align="right">${ccyFormat(item.price * item.quantity)}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell className={classes.units} colSpan={2}>Subtotal</TableCell>
                                    <TableCell align="right">${ccyFormat(invoiceSubtotal)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.units}>Tax</TableCell>
                                    <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                                    <TableCell align="right">${ccyFormat(invoiceTaxes)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.units} colSpan={2}>Total</TableCell>
                                    <TableCell align="right">${ccyFormat(invoiceTotal)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            })
        )
    }

    const hasStores = props.stores.filter(store => store.user_id === props.user.id)
    if (props.loadingStores) {
        return (
            <>
                <p>Loading stores...</p>
            </>
        )
    } else if (hasStores.length === 0) {
        return (
            <>
                <NoStoresYet />
                {/* <p component={Paper} className={classes.paper}>YOU HAVE NOT CREATED A STORE YET</p> */}
            </>
        )
    } else {
        return (
            <>
                {renderStoreTable(props.user.id)}
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    stores: state.stores.stores,
    items: state.items.items,
    loadingStores: state.stores.loading,
    loadingItems: state.items.loading
})

const mapDispatchToProps = dispatch => ({
    setStoreId: (id) => dispatch({ type: SET_STORE_ID, payload: id }),
    clearErrors: () => dispatch({ type: CLEAR_ERRORS })
})

export default connect(mapStateToProps, mapDispatchToProps)(Stores)