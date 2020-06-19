import React from 'react'
import { connect } from 'react-redux'
import Copyright from '../Layout/Copyright'

import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import Box from '@material-ui/core/Box';

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

function SignInSuccess(props) {
    const classes = useStyles();
    const wideCardMediaStyles = useWideCardMediaStyles();

    if (props.user) {
        return (
            <Grid className={classes.grid} item s={3}>
                <Card className={classes.root}>
                    <CardActionArea component={RouterLink} to="/">
                        <CardMedia
                            classes={wideCardMediaStyles}
                            image="https://images.unsplash.com/photo-1460467820054-c87ab43e9b59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1261&q=80"
                            title="Welcome, please come in"
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
                        <Button
                            size="small"
                            color="primary"
                            component={RouterLink}
                            to="/">
                            My Stores
                        </Button>
                        <Button size="small" color="primary">
                            New
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

export default connect(mapStateToProps)(SignInSuccess)