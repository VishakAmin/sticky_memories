import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import memories from './images/memories.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts'

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])


    return (
        <Container maxWidth='lg'>
            <AppBar className={classes.appBar} position="static" color='inherit'>
                <Typography className={classes.heading} variant="h2" align="center">
                    Sticky Memories
                    <img className={classes.image} src={memories} alt="sticky_memories" height="60" />
                </Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" align="strech" spacing={4}>
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
