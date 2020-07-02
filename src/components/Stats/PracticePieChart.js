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
import { makeStyles } from '@material-ui/core/styles';

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
}))

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
function PracticePieChart(props) {
    const classes = useStyles();
    const [chartData, setChartData] = useState({
        name: "",
        price: ""
    })

    const fillChartData = () => {
        const userStores = props.stores.filter(store => store.user_id === id)
        userStores.map(store => {
            const userItems = props.items.filter(item => item.store_id === store.id)
            userItems.map(item => {
                setChartData({
                    name: item.name,
                    price: item.price
                })
            })
        })
    }

    const renderPieChart = (id) => {
        fillChartData()
        const userStores = this.props.stores.filter(store => store.user_id === this.props.user.id).reverse()
        return (
            userStores.map(store => {
                const userItems = this.props.items.filter(item => item.store_id === store.id)
                return (
                    <Paper>
                        <Chart
                            data={chartData}
                        >
                            {userItems.map((item) => (
                                <PieSeries
                                    valueField="price"
                                    argumentField="name"
                                />
                            ))}
                            <Title
                                text={store.name}
                            />
                            <Animation />
                        </Chart>
                    </Paper>
                )
            })
        )
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
    stores: state.stores.stores,
    items: state.items.items
})

export default connect(mapStateToProps)(PracticePieChart)