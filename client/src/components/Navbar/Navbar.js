import React from 'react';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';
import useStyles from './styles';
import { Link } from "react-router-dom";

function Navbar() {
    const classes = useStyles();
    const user = null;
    return (
        <AppBar className={classes.appBar} position="static" color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
                    Sticky Memories
                </Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt[0]}</Avatar>
                        <Typography className={classes.userName} variat="h6" >{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary">Log out</Button>
                    </div>
                ) : (
                        <div>
                            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                        </div>)}
            </Toolbar>
        </AppBar>

    )
}

export default Navbar

