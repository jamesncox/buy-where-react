import * as React from 'react';
import { connect } from 'react-redux'
import NoStatsYet from '../Layout/NoStatsYet'
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    PieSeries,
    Title,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

class PieChart extends React.PureComponent {

    renderPieChart = (id) => {
        const userStores = this.props.stores.filter(store => store.user_id === this.props.user.id).reverse()
        return (
            userStores.map(store => {
                const userItems = this.props.items.filter(item => item.store_id === store.id)
                return (
                    userItems.map(item => {
                        return (
                            <Paper>
                                <Chart
                                    data={userItems}
                                >
                                    <PieSeries
                                        valueField={item.price}
                                        argumentField={item.name}
                                    />
                                    <Title
                                        text={store.name}
                                    />
                                    <Animation />
                                </Chart>
                            </Paper>
                        )
                    })
                )
            })
        )
    }

    render() {
        const hasStores = this.props.stores.filter(store => store.user_id === this.props.user.id)
        if (hasStores.length === 0) {
            return <NoStatsYet />
        } else {
            return this.renderPieChart(this.props.user.id)
        }
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    stores: state.stores.stores,
    items: state.items.items
})

export default connect(mapStateToProps)(PieChart)