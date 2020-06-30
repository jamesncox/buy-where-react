import React, { useState } from 'react';
import { connect } from 'react-redux'
import NoStatsYet from '../Layout/NoStatsYet'
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    PieSeries,
    Title,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

// const data = [
//     { country: 'Russia', area: 12 },
//     { country: 'Canada', area: 7 },
//     { country: 'USA', area: 7 },
//     { country: 'China', area: 7 },
//     { country: 'Brazil', area: 6 },
//     { country: 'Australia', area: 5 },
//     { country: 'India', area: 2 },
//     { country: 'Others', area: 55 },
// ];


function PieChart(props) {
    const [data, setData] = useState([])


    // const { data: chartData } = this.state;

    // return (
    //     <Paper>
    //         <Chart
    //             data={chartData}
    //         >
    //             <PieSeries
    //                 valueField="area"
    //                 argumentField="country"
    //             />
    //             <Title
    //                 text="Total Spending At Stores"
    //             />
    //             <Animation />
    //         </Chart>
    //     </Paper>
    // );

    const renderPieChart = (id) => {
        const userStores = props.stores.filter(store => store.user_id === id)
        return (
            userStores.map(store => {
                const userItems = props.items.filter(item => item.store_id === store.id)
                return (
                    < Paper >
                        <Chart
                            data={store}
                        >
                            {userItems.map((item) => (
                                <PieSeries
                                    valueField={item.price}
                                    argumentField={item.name}
                                />
                            ))}
                            <Title
                                text={store.name}
                            />
                            <Animation />
                        </Chart>
                    </Paper >
                )
            })
        );
    }

    const hasStores = props.stores.filter(store => store.user_id === props.user.id)
    if (hasStores.length === 0) {
        return <NoStatsYet />
    } else {
        return renderPieChart(props.user.id)
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    stores: state.stores.stores
})

export default connect(mapStateToProps)(PieChart)