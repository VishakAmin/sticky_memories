import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])


    return (
        <Container maxWidth='lg'>
            <Navbar />
            <Grow in>
                <Container>
                    <Grid container className={classes.mainContainer} justify="space-between" align="strech" spacing={4}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form setCurrentId={setCurrentId} currentId={currentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>

    )
}

export default App;
