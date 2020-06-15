import React from 'react'
import connect from 'react-redux'

function Table(props) {

    const renderStoreTable = (id) => {
        const userStores = this.props.stores.filter(store => store[0].user_id === id)

    }

    const hasStores = this.props.stores.filter(store => store[0].user_id === props.user.id)
    if (this.props.loadingStores) {
        return (
            <>
                <p>Loading stores...</p>
            </>
        )
    } else if (hasStores.length === 0) {
        return (
            <>
                <p>You have created a store list  yet</p>
            </>
        )
    } else {
        { renderStoreTable(props.user.id) }
    }
}

const mapStateToProps = state({
    user: state.users.user,
    stores: state.stores.stores,
    loadingStores: state.stores.loading
})

export default connect(mapStateToProps)(Table)