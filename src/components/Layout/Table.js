import React from 'react'
import { connect } from 'react-redux'

function Table(props) {

    const renderStoreTable = (id) => {
        const userStores = props.stores.filter(store => store.user_id === id)
        return (
            userStores.map(store => {
                return (
                    store.items.map(item => {
                        return (
                            <>
                                <p style={{ color: `${store.color}` }}>{store.name}</p>
                                <tr key={store.id}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            </>
                        )
                    })
                )
            })
        )
    }

    const renderTableHeader = () => {
        let header = Object.keys(props.stores[0].items[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
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
                <p>You have created a store list yet</p>
            </>
        )
    } else {
        return (
            <>
                <h3 id='title'>Stores and Items</h3>
                <table id='stores'>
                    <tbody>
                        <tr>{renderTableHeader()}</tr>
                        {renderStoreTable(props.user.id)}
                    </tbody>
                </table>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    stores: state.stores.stores,
    loadingStores: state.stores.loading
})

export default connect(mapStateToProps)(Table)