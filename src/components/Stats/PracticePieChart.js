import React from 'react';
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
    pieChart: {
        width: "25%",
    },
    title: {
        marginBottom: "-20em"
    }
}))

function PracticePieChart(props) {
    const classes = useStyles();
    const chartData = []

    const fillChartData = (id) => {
        const userStores = props.stores.filter(store => store.user_id === id)
        userStores.map(store => {
            const userItems = props.items.filter(item => item.store_id === store.id)
            return (
                userItems.map(item => {
                    return (
                        chartData.push({ name: item.name, price: item.price })
                    )
                })
            )
        })
    }

    const renderPieChart = (id) => {
        fillChartData(props.user.id)
        const userStores = props.stores.filter(store => store.user_id === id)
        console.log(chartData)

        return (
            <Paper className={classes.container}>
                {userStores.map(store => {
                    const userItems = props.items.filter(item => item.store_id === store.id)
                    return (

                        <Chart
                            data={chartData}
                            key={store.id}
                            className={classes.pieChart}
                        >
                            {userItems.map((item) => (
                                <PieSeries
                                    valueField="price"
                                    argumentField="name"
                                />
                            ))}
                            <Title
                                text={store.name}
                                className={classes.title}
                            />
                            <Animation />
                        </Chart>

                    )
                })}
            </Paper>
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