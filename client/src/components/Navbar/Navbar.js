import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';
import useStyles from './styles';
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

function Navbar() {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    console.log(user);

    const onLogout = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/');

        setUser(null);
    }
    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                onLogout();
            }
        }
        //JWT
        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location])
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
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={onLogout}>Log out</Button>
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

