import React from 'react'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import Copyright from '../Layout/Copyright'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';


const useStyles = makeStyles((theme) => ({
    root: {
        width: "40%",
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: "95%",
        }
    },
    grid: {
        marginTop: "5rem",
    },
    topMargin: {
        marginTop: theme.spacing(2)
    }
}));

function WelcomeUser(props) {
    const classes = useStyles();
    const wideCardMediaStyles = useWideCardMediaStyles();

    if (props.user) {
        return (
            <Grid className={classes.grid} item s={3}>
                <Card className={classes.root}>
                    <CardActionArea component={RouterLink} to="/SignIn">
                        <CardMedia
                            classes={wideCardMediaStyles}
                            image="https://images.pexels.com/photos/4473400/pexels-photo-4473400.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                            title="Welcome sign"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Buy / Where
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Track your spending at the stores you love
                            </Typography>
                            <Typography className={classes.topMargin} variant="body2" color="textSecondary" component="p">
                                Sign In to your account or Sign Up to create an account
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
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    errors: state.users.errors,
    loggedIn: state.users.loggedIn
})

export default connect(mapStateToProps)(WelcomeUser)