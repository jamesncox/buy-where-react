import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    SET_STORE_ID,
    SET_ITEM_ID,
    CLEAR_ERRORS,
    NEW_STORE_CLOSE,
    NEW_STORE_OPEN,
    NEW_ITEM_OPEN,
    EDIT_STORE_OPEN,
    EDIT_STORE_CLOSE,
    EDIT_ITEM_OPEN
} from '../../actionTypes'
import NewItem from '../Item/NewItem'
import NoStoresYet from '../Layout/NoStoreYet'
import EditStore from './EditStore'
import EditItem from '../Item/EditItem'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CircularProgress from '@material-ui/core/CircularProgress'

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
        align: "left",
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]: {
            fontSize: "1rem"
        },
    },
    units: {
        fontWeight: "bold",
        color: "rgba(0, 0, 0, 0.65)"
    },
    storeType: {
        color: "white",
        [theme.breakpoints.down('xs')]: {
            fontSize: ".75rem"
        },
    },
    icons: {
        color: "rgba(255, 255, 255, 0.9)",
        float: "left",
        cursor: "pointer",
        fontSize: "2rem",
        marginRight: ".15em",
        [theme.breakpoints.down('xs')]: {
            fontSize: "1.25rem"
        },
    },
    iconColumn: {
        width: 1
    },
    invoiceStyles: {
        fontWeight: "bold",
        color: "rgba(0, 0, 0, 0.65)"
    },
    spinner: {
        display: 'flex',
        '& > * + *': {
            margin: 'auto',
        },
    },
    itemRow: {
        width: "18em",
        cursor: "pointer",
        [theme.breakpoints.down('md')]: {
            width: "16em"
        },
        [theme.breakpoints.down('sm')]: {
            width: "15em"
        },
        [theme.breakpoints.down('xs')]: {
            width: "8em"
        },
    },
    cursorPointer: {
        cursor: "pointer"
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

    const [showEditStore, setShowEditStore] = useState(false)
    const [showNewItem, setShowNewItem] = useState(false)
    const [showEditItem, setShowEditItem] = useState(false)

    const handleShowEditStore = (id) => {
        if (!showEditStore) {
            setShowEditStore(showEditStore === id ? true : id)
            props.setStoreId(id)
            setShowNewItem(false)
            setShowEditItem(false)
            props.clearErrors()
            props.newStoreClose()
            props.editStoreOpen()
        } else {
            setShowEditStore(showEditStore === id ? false : id)
            props.setStoreId(id)
            props.clearErrors()
            props.editStoreOpen()
        }
    }

    const handleShowNewItem = (id) => {
        if (!showNewItem) {
            setShowNewItem(showNewItem === id ? true : id)
            props.setStoreId(id)
            setShowEditStore(false)
            setShowEditItem(false)
            props.clearErrors()
            props.newStoreClose()
            props.newItemOpen()
        } else {
            setShowNewItem(showNewItem === id ? false : id)
            props.setStoreId(id)
            props.clearErrors()
            props.newItemOpen()
        }
    }

    const handleShowEditItem = (id, storeID) => {
        if (!showEditItem) {
            setShowEditItem(showEditItem === id ? true : id)
            props.setItemId(id)
            props.setStoreId(storeID)
            setShowEditStore(false)
            setShowNewItem(false)
            props.newStoreClose()
            props.clearErrors()
            props.editItemOpen()
        } else {
            setShowEditItem(showEditItem === id ? false : id)
            props.setItemId(id)
            props.setStoreId(storeID)
            props.clearErrors()
            props.editItemOpen()
        }
    }

    const renderStoreTable = (id) => {
        const userStores = props.stores.filter(store => store.user_id === id).reverse()
        return (
            userStores.map(store => {
                const userItems = props.items.filter(item => item.store_id === store.id).reverse()
                const invoiceSubtotal = subtotal(userItems);
                const invoiceTaxes = TAX_RATE * invoiceSubtotal;
                const invoiceTotal = invoiceTaxes + invoiceSubtotal;
                return (
                    <TableContainer key={store.id} className={classes.container} component={Paper}>
                        {showEditStore === store.id && props.isEditStoreOpen ? <EditStore /> : null}
                        {showNewItem === store.id && props.isNewItemOpen ? <NewItem /> : null}
                        {showEditItem === props.itemId && props.storeId === store.id && props.isEditItemOpen ? <EditItem /> : null}
                        <Table className={classes.table} aria-label="spanning table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: `${store.color}` }}>
                                    <TableCell>
                                        <AddBoxIcon className={classes.icons} onClick={() => handleShowNewItem(store.id)} />
                                        <DeleteForeverIcon className={classes.icons} />
                                    </TableCell>
                                    <TableCell onClick={() => handleShowEditStore(store.id)} className={classes.title} colSpan={2}>
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
                                    <TableRow hover={true} className={classes.cursorPointer} key={item.id} onClick={() => handleShowEditItem(item.id, store.id)}>
                                        <TableCell className={classes.itemRow}>{itemFormat(item.name)}</TableCell>
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
            <div className={classes.spinner}>
                <CircularProgress />
            </div>
        )
    } else if (hasStores.length === 0) {
        return <NoStoresYet />
    } else {
        return renderStoreTable(props.user.id)
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    stores: state.stores.stores,
    items: state.items.items,
    loadingStores: state.stores.loading,
    loadingItems: state.items.loading,
    isStoreOpen: state.isOpen.isStoreOpen,
    isNewItemOpen: state.isOpen.isNewItemOpen,
    isEditStoreOpen: state.isOpen.isEditStoreOpen,
    isEditItemOpen: state.isOpen.isEditItemOpen,
    itemId: state.items.itemId,
    storeId: state.stores.storeId
})

const mapDispatchToProps = dispatch => ({
    setStoreId: (id) => dispatch({ type: SET_STORE_ID, payload: id }),
    setItemId: (id) => dispatch({ type: SET_ITEM_ID, payload: id }),
    clearErrors: () => dispatch({ type: CLEAR_ERRORS }),
    newStoreClose: () => dispatch({ type: NEW_STORE_CLOSE }),
    newStoreOpen: () => dispatch({ type: NEW_STORE_OPEN }),
    newItemOpen: () => dispatch({ type: NEW_ITEM_OPEN }),
    editStoreOpen: () => dispatch({ type: EDIT_STORE_OPEN }),
    editStoreClose: () => dispatch({ type: EDIT_STORE_CLOSE }),
    editItemOpen: () => dispatch({ type: EDIT_ITEM_OPEN })
})

export default connect(mapStateToProps, mapDispatchToProps)(Stores)