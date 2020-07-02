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

function PracticePieChart(props) {
    const classes = useStyles();
    const [chartData, setChartData] = useState({
        name: "",
        price: ""
    })

    const fillChartData = (id) => {
        const userStores = props.stores.filter(store => store.user_id === id)
        userStores.map(store => {
            const userItems = props.items.filter(item => item.store_id === store.id)
            return (
                userItems.map(item => {
                    return (
                        setChartData({
                            name: item.name,
                            price: item.price
                        })
                    )
                })
            )
        })
    }

    const renderPieChart = (id) => {
        fillChartData(props.user.id)
        const userStores = props.stores.filter(store => store.user_id === id)

        return (
            userStores.map(store => {
                const userItems = props.items.filter(item => item.store_id === store.id)
                return (
                    <Paper className={classes.container}>
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