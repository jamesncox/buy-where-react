import React from 'react';
import { connect } from 'react-redux'

import { CLEAR_ERRORS } from '../../actionTypes'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: 'auto',
        marginTop: '2em',
    },
    media: {
        height: 140,
    },
    paper: {
        color: theme.palette.text.secondary,
    },
    error: {
        marginLeft: theme.spacing(7)
    }
}));

function Errors(props) {
    const classes = useStyles();

    const handleClearErrors = () => {
        props.clearErrors()
    }

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleClearErrors}>
                <CardMedia
                    className={classes.media}
                    image="https://miro.medium.com/max/978/1*pUEZd8z__1p-7ICIO1NZFA.png"
                    title="Error"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Something went wrong
                    </Typography>
                    <List className={classes.error}>
                        {props.errors.map((error, index) => {
                            return (
                                <ListItem key={index}>
                                    <ListItemText className={classes.paper} align="left" key={index}>{error}</ListItemText>
                                </ListItem>
                            )
                        })}
                    </List>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={handleClearErrors}>
                    Try Again
                </Button>
            </CardActions>
        </Card>
    );
}

const mapStateToProps = state => ({
    errors: state.errors.errors
})

const mapDispatchToProps = dispatch => ({
    clearErrors: () => dispatch({ type: CLEAR_ERRORS })
})

export default connect(mapStateToProps, mapDispatchToProps)(Errors)