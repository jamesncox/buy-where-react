import React from 'react'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import { signupUser } from '../../actions/users'
import Copyright from '../Layout/Copyright'
import WelcomeImage from '../../assets/images/welcome sign.jpeg'

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
    },
}));

function WelcomeUser(props) {
    const classes = useStyles();
    const wideCardMediaStyles = useWideCardMediaStyles();

    const randomNumber = () => {
        const rand = Math.floor((Math.random() * 1000000) + 1)
        return rand.toString()
    }

    const handleGuestSignUp = e => {
        e.preventDefault()
        const user = {
            username: "Guest" + randomNumber(),
            password: "guest",
            password_confirmation: "guest"
        }
        props.signupUser(props.token, user)
    }

    return (
        <Grid className={classes.grid} item s={3}>
            <Card className={classes.root}>
                <CardActionArea component={RouterLink} to="/SignIn">
                    <CardMedia
                        classes={wideCardMediaStyles}
                        image={WelcomeImage}
                        title="Welcome sign"
                    />
                </CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Buy / Where
                            </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Track your spending at the stores you love
                            </Typography>
                    <Typography className={classes.topMargin} variant="body2" color="textSecondary" component="p">
                        Sign in to your account or sign up to create an account
                            </Typography>
                    <Typography className={classes.topMargin} variant="body2" color="textSecondary" component="p">
                        Want to explore without signing up? Try as a guest!
                    </Typography>
                </CardContent>
                <CardActions >
                    <Button
                        size="small"
                        color="primary"
                        component={RouterLink}
                        to="/SignIn"
                    >
                        Sign In
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        component={RouterLink}
                        to="/SignUp"
                    >
                        Sign Up
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={handleGuestSignUp}
                    >
                        Try As Guest
                    </Button>
                </CardActions>
            </Card>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Grid>
    );
}

const mapStateToProps = state => ({
    token: state.sessions.token,
})

export default connect(mapStateToProps, { signupUser })(WelcomeUser)