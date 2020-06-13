import React from 'react'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';

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
        height: 500,
        width: "100",
        [theme.breakpoints.down('sm')]: {
            height: 400,
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

function LogOut(props) {
    const classes = useStyles();

    if (props.user) {
        return (
            <Grid className={classes.grid} item s={3}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://images.unsplash.com/photo-1591635025101-9a66487172ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                            title="The best is yet to come"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Thanks for visiting
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Please come back and hang out soon!
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button
                            size="small"
                            color="primary"
                            component={RouterLink}
                            to="/SignIn">
                            Sign In
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            component={RouterLink}
                            to="/SignUp">
                            Sign Up
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

export default connect(mapStateToProps)(LogOut)