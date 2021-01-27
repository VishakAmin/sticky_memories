import React from 'react'
import { TextField, Grid, IconButton } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';




const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
    // console.log(name);
    // console.log(label, "dsdsa", handleChange, half, type, autoFocus, handleShowPassword);

    return (
        <Grid item xs={12} sm={half ? 6 : 12}>

            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                } : null}
            />
        </Grid>
    )
}

export default Input;
