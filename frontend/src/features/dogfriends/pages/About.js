import React from 'react';
import { 
  Zoom,
  makeStyles,
 } from '@material-ui/core'; 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '75%'
    },
    [theme.breakpoints.up('xl')]: {
      width: '65%'
    },
  },
  displayWrapper: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
    [theme.breakpoints.up('md')]: {
      flexWrap: 'no-wrap',
    },
    width: '100%',
    minWidth: 210,
    minHeight: 210,
  },
  displayContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '70%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.up('md')]: {
      width: '30%',
    },    
    minWidth: 200,
    minHeight: 200,
    margin: 20,
    padding: 10,
    borderRadius: 30,
    background: `linear-gradient(45deg, ${theme.palette.common.brown} 30%, ${theme.palette.common.brownDark} 90%)`,
    boxShadow: '0 10px 6px -6px #80808080',
  },
  heading: {
    ...theme.typography.h3,
    color: 'white',
  },
  subHeading: {
    ...theme.typography.subtitle2,
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  
}));
const About = () => {
  const classes = useStyles(); 
  return (
    <Zoom in={true} style={{ transitionDelay: '1ms' }}> 
    <div className={classes.root}>
      <div className={classes.displayWrapper}>
        <div className={classes.displayContent}>
            <div className={classes.heading}>Our mission</div>
            <div className={classes.subHeading}>We strive to make dogs happy and to connect doggers.</div>
        </div>
        <div className={classes.displayContent}>
          <div className={classes.heading}>Our status</div>
          <div className={classes.subHeading}>The status of Dog Friends is under construction.</div>
        </div>
      </div>
      <div className={classes.displayWrapper}>
        <div className={classes.displayContent}>
          <div className={classes.heading}>Our future</div>
          <div className={classes.subHeading}>The future of Dog Friends is a complete dogger friendship atmosphere.</div>
        </div>
        <div className={classes.displayContent}>
          <div className={classes.heading}>Our promise</div>
          <div className={classes.subHeading}>We promise to do our best to make doggers happy.</div>
        </div>
      </div>
    </div>
    </Zoom>
  )
}


export default About
