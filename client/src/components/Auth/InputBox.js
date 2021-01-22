import React from 'react'
import { TextField, Grid, IconButton } from "@material-ui/core";
import { Visibility } from '@material-ui/icons/Visibility';
import { VisibilityOff } from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';




export default function InputBox({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) {
    console.log("Input 1");

    return (
        <Grid item xs={12} sm={half ? 6 : 12}>

            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                label={label}
                autoFocus={autoFocus}
                type={type}
                fullWidth
                InputProps={name === 'password' && {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </Grid>
    )
}
