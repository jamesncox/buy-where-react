import React from 'react'
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';


export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center" style={{ marginBottom: "2em" }}>
            {'Copyright © '}
            <Link color="inherit" component={RouterLink} to="/">
                Buy / Where
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}