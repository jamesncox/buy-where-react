import React from 'react'
import { connect } from 'react-redux'

function Table(props) {

    const renderStoreTable = (id) => {
        // debugger
        const userStores = props.stores.filter(store => store.user_id === id)
        return (
            <>
                <p style={{ color: `${userStores[0].color}` }}>{userStores[0].name}</p>
                <tr key={userStores[0].id}>
                    <td>{userStores[0].items[0].name}</td>
                    <td>{userStores[0].items[0].price}</td>
                </tr>
            </>
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
                <p>You have created a store list yet</p>
            </>
        )
    } else {
        return renderStoreTable(props.user.id)
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    stores: state.stores.stores,
    loadingStores: state.stores.loading
})

export default connect(mapStateToProps)(Table)