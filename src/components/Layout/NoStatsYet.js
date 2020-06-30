import React from 'react';
import StartImage from '../../assets/images/start road.jpg'
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: 'auto',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    media: {
        height: 240,
    },
}));

function NoStatsYet(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea component={RouterLink} to="/">
                <CardMedia
                    className={classes.media}
                    image={StartImage}
                    title="Painted arrow pointing up"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        No stores / No stats
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Click here to go create your first store!
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default NoStatsYet