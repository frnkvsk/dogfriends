import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './features/dogfriends/Theme';

import Navbar from './features/dogfriends/components/Navbar'; 
import Home from './features/dogfriends/pages/Home';
import NewPost from './features/dogfriends/pages/NewPost';
import Login from './features/dogfriends/pages/Login';
import PostList from './features/dogfriends/pages/PostList';
import Profile from './features/dogfriends/pages/Profile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '20px',
    width: '100%',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '85%'
    },
    [theme.breakpoints.up('xl')]: {
      width: '75%'
    },
    border: 'none',
  },
}));
function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar/>
        <div className={classes.root}>
          <main className={classes.main}>
          <Switch>        
            <Route exact path="/">
              <Home />        
            </Route>
            <Route exact path="/login">
              <Login/>        
            </Route>
            <Route exact path="/new">
              <NewPost/>        
            </Route>
            <Route exact path="/profile">
              <Profile/>        
            </Route>
            <Route exact path="/:id">
              <PostList/>        
            </Route>                 
                              
          </Switch> 
          </main>        
        </div>        
      </BrowserRouter>
    </ThemeProvider>
    
  );
}

export default App;
