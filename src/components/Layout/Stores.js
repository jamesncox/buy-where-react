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
    },
    container: {
        width: 500,
        margin: 'auto',
        marginTop: '2em'
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: "bold",
    }
});

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, cost) {
    return qty * cost;
}

function createRow(item, qty, cost) {
    const price = priceRow(qty, cost);
    return { item, qty, cost, price };
}

function subtotal(items) {
    return items.map(item => item.price).reduce((sum, i) => sum + i, 0);
}

// const rows = [
//     createRow('Paperclips (Box)', 100, 1.15),
//     createRow('Paper (Case)', 10, 45.99),
//     createRow('Waste Basket', 2, 17.99),
// ];

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
                    store.items.map(item => {
                        return (
                            <TableContainer className={classes.container} component={Paper}>
                                <Table className={classes.table} aria-label="spanning table">
                                    <TableHead>
                                        <TableRow key={store.id}>
                                            <TableCell className={classes.title} align="center" colSpan={4} key={store.id} style={{ color: `${store.color}` }}>
                                                {store.name}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Item</TableCell>
                                            <TableCell align="right">Qty.</TableCell>
                                            <TableCell align="right">Cost</TableCell>
                                            <TableCell align="right">Sum</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key={item.id}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                            <TableCell align="right">{item.price}</TableCell>
                                            <TableCell align="right">{ccyFormat(item.price)}</TableCell>
                                        </TableRow>

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
                <h3 id='title'>Stores and Items</h3>
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