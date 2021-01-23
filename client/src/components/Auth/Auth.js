import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import InputBox from './InputBox';
import { GoogleLogin } from 'react-google-login';
import Icon from './Icon';

const Auth = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = () => {

    }
    const handleChange = () => {


    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const switchMode = () => {
        setIsSignup((prev) => !prev)
        handleShowPassword(false);
    }

    const googleSuccess = async (res) => {
        //    console.log(res);
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
        }
        catch (error) {
            console.log(error);
        }

    }

    const googleFailure = (error) => {
        console.log("Google Sign in is unsuccessful. Try again later", error);

    }


    return (
        <div>
            <Container compenent="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"} </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignup && (
                                    <>
                                        <InputBox name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                        <InputBox name="lastName" label="Last Name" handleChange={handleChange} half />
                                    </>
                                )
                            }

                            <InputBox name="email" label="Email Address" handleChange={handleChange} autoFocus type="email" />
                            <InputBox name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {isSignup && <InputBox name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                        </Grid>


                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignup ? "Sign Up" : "Sign In"}
                        </Button>
                        <GoogleLogin
                            clientId="261595754992-kk2q92htro1ugavklnjj706q4c69nlsu.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button className={classes.googleButton}
                                    color='primary'
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    disa bled={renderProps.disabled}
                                    variant="contained"
                                    startIcon={<Icon />}
                                >
                                    Google Sign In

                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justify="flex-end">
                            <Grid item >
                                <Button onClick={switchMode}>
                                    {isSignup ? "Already Have an Account? Sign In" : "Don't have an Account? Sign Up"}
                                </Button>

                            </Grid>

                        </Grid>
                    </form>

                </Paper>

            </Container>
        </div >
    )
}

export default Auth;
