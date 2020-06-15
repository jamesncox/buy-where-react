import React from 'react'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TAX_RATE = 0.07;

const useStyles = makeStyles({
    table: {
        width: "100%",
        // backgroundColor: "rgba(226, 226, 255, 0.1)"
    },
    container: {
        width: "40em",
        margin: 'auto',
        marginTop: '2em'
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "white"
    },
    units: {
        fontWeight: "bold"
    },
    storeType: {
        color: "white"
    }
});

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, cost) {
    return qty * cost;
}

function createRow(item, qty, cost) {
    const sum = priceRow(qty, cost);
    return { item, qty, cost, sum };
}

function subtotal(items) {
    return items.map(item => item.price).reduce((sum, i) => sum + i, 0);
}

function Stores(props) {
    const classes = useStyles();

    const renderStoreTable = (id) => {
        const userStores = props.stores.filter(store => store.user_id === id)
        return (
            userStores.map(store => {
                const invoiceSubtotal = subtotal(store.items);
                const invoiceTaxes = TAX_RATE * invoiceSubtotal;
                const invoiceTotal = invoiceTaxes + invoiceSubtotal;
                return (
                    <TableContainer className={classes.container} component={Paper}>
                        <Table className={classes.table} aria-label="spanning table">
                            <TableHead>
                                <TableRow key={store.id} style={{ backgroundColor: `${store.color}` }}>
                                    <TableCell className={classes.title} align="center" colSpan={3} key={store.id} >
                                        {(store.name).toUpperCase()}
                                    </TableCell>
                                    <TableCell key={store.id} align="right" className={classes.storeType}>{(store.store_type).toUpperCase()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.units}>Item</TableCell>
                                    <TableCell className={classes.units} align="right">Qty.</TableCell>
                                    <TableCell className={classes.units} align="right">Cost</TableCell>
                                    <TableCell className={classes.units} align="right">Sum</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {store.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell align="right">{item.quantity}</TableCell>
                                        <TableCell align="right">{item.price}</TableCell>
                                        <TableCell align="right">{ccyFormat(item.price)}</TableCell>
                                    </TableRow>
                                ))}

                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={2}>Subtotal</TableCell>
                                    <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tax</TableCell>
                                    <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                                    <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
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
                <p>You have not created a store list yet</p>
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
    loadingStores: state.stores.loading
})

export default connect(mapStateToProps)(Stores)