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

const data = [
    { country: 'Russia', area: 12 },
    { country: 'Canada', area: 7 },
    { country: 'USA', area: 7 },
    { country: 'China', area: 7 },
    { country: 'Brazil', area: 6 },
    { country: 'Australia', area: 5 },
    { country: 'India', area: 2 },
    { country: 'Others', area: 55 },
];
class PracticePieChart extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data,
        };
    }

    renderPieChart = (id) => {
        const { data: chartData } = this.state;

        return (
            <Paper style={{ width: "30em", margin: "auto" }}>
                <Chart
                    data={chartData}
                    style={{ width: "500px" }}
                >
                    <PieSeries
                        valueField="area"
                        argumentField="country"
                    />
                    <Title
                        text="Area of Countries"
                    />
                    <Animation />
                </Chart>
            </Paper>
        );
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

export default connect(mapStateToProps)(PracticePieChart)