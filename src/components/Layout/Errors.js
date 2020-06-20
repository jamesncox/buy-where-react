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
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Errors(props) {
    const classes = useStyles();

    const mapErrors = () => {
        props.errors.map(error => {
            return (
                <li className={classes.paper}>{error}</li>
            )
        })
    }

    const handleClearErrors = () => {
        props.clearErrors()
    }

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleClearErrors}>
                <CardMedia
                    className={classes.media}
                    image=""
                    title=""
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        ERROR!
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {mapErrors()}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {/* <CardActions>
                <Button size="small" color="primary">
                    Share
        </Button>
                <Button size="small" color="primary">
                    Learn More
        </Button>
            </CardActions> */}
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