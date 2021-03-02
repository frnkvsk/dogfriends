import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './features/dogfriends/Theme';
import Navbar from './features/dogfriends/components/Navbar'; 
import Home from './features/dogfriends/pages/Home';
import NewPost from './features/dogfriends/pages/NewPost';
import Login from './features/dogfriends/pages/Login';
import Post from './features/dogfriends/pages/Post';
import Profile from './features/dogfriends/pages/Profile';
import About from './features/dogfriends/pages/About';
import Contact from './features/dogfriends/pages/Contact';
import Footer from './features/dogfriends/components/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // padding: '20px',
    width: '100%',
    minHeight: '80vh',
    border: '1px solid red',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('lg')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '85%'
    },
    [theme.breakpoints.up('xl')]: {
      width: '75%'
    },
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
            <Route exact path="/new">              
              <NewPost/>            
            </Route>
            <Route exact path="/profile">
              <Profile/>        
            </Route>            
            <Route exact path="/about">
              <About/>        
            </Route>
            <Route exact path="/contact">
              <Contact/>        
            </Route>
            <Route exact path="/login">
              <Login/>        
            </Route>           
            <Route path="/post/:parent_id">
              <Post />        
            </Route>                 
                              
          </Switch> 
          </main>        
        </div> 
        <Footer />       
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
