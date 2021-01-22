import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import InputBox from './InputBox';

const Auth = () => {
    const classes = useStyles();
    const isSignup = false;
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {

    }
    const handleChange = () => {


    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    return (
        <div>
            <Container compenent="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"} </Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {
                                    isSignup && (
                                        <>
                                            <InputBox name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                            <InputBox name="firstName" label="Last Name" handleChange={handleChange} autoFocus half />
                                        </>
                                    )
                                }

                                <InputBox name="email" label="Email Address" handleChange={handleChange} type="email" />
                                <InputBox name="password" label="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                                {isSignup && <InputBox name="confirmpassword" handleChange={handleChange} label="Repeat Password" type="password" />}
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>

                                {isSignup ? "Sign up" : "Sign In"}

                            </Button>

                        </form>
                    </Avatar>

                </Paper>

            </Container>
        </div>
    )
}

export default Auth;
