import React from 'react'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "80%",
        [theme.breakpoints.down('sm')]: {
            width: "95%",
        }
    },
    media: {
        height: 350,
        width: "100",
        [theme.breakpoints.down('sm')]: {
            height: 200,
        }
    },
    grid: {
        marginTop: "5rem",
        marginLeft: "20%",
        [theme.breakpoints.down('sm')]: {
            marginLeft: "5%",
        }
    },
}));

function SignInSuccess(props) {
    const classes = useStyles();

    if (props.user) {
        return (
            <Grid className={classes.grid} item s={3}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://images.unsplash.com/photo-1533745848184-3db07256e163?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"
                            title="Rainbow welcome sign"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Hi, {props.user.username}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Click profile to see all your lists or click new to create a new store list
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Profile
                        </Button>
                        <Button size="small" color="primary">
                            New
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    errors: state.users.errors,
    loggedIn: state.users.loggedIn
})

export default connect(mapStateToProps)(SignInSuccess)