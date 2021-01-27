import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './Icon';
import { signin, signup } from '../../actions/auth'


const intialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }
const Auth = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(intialState)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, history))

        } else {
            dispatch(signin(formData, history))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const switchMode = () => {
        setIsSignup((prev) => !prev)
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        //    console.log(res);
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/')
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
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                    </>
                                )
                            }

                            <Input name="email" label="Email Address" handleChange={handleChange} autoFocus type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
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
