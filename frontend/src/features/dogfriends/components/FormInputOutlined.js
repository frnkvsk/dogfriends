import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormHelperText, OutlinedInput } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({  
  label: {
    fontSize: '18px',
    fontWeight: 'bold',
    width: '100%',
    marginTop: '10px'
  },
  input: {
    width: '100%'
  },

}));

export default function FormInputOutlined({label, formInput}) {
  const classes = useStyles();
  return (
    <>
    <FormHelperText className={classes.label} >{label}</FormHelperText>
    <OutlinedInput className={classes.input} variant="outlined" {...formInput}/> 
    </>
  );
}