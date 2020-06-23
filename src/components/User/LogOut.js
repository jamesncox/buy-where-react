import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import Copyright from '../Layout/Copyright'
import { newStoreClose } from '../../actions/isOpen'

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
}));

function LogOut(props) {
    const dispatch = useDispatch()
    const classes = useStyles();
    const wideCardMediaStyles = useWideCardMediaStyles();

    useEffect(() => {
        dispatch(newStoreClose())
    }, [dispatch])

    if (props.user) {
        return (
            <Grid className={classes.grid} item s={3}>
                <Card className={classes.root}>
                    <CardActionArea component={RouterLink} to="/SignIn">
                        <CardMedia
                            classes={wideCardMediaStyles}
                            image="https://www.tinyprints.com/inspiration/wp-content/uploads/2019/02/thank-you-quotes-1-1024x683.jpg"
                            title="Thank you Scrabble tiles"
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

export default connect(mapStateToProps, { newStoreClose })(LogOut)