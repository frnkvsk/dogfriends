import {useState} from 'react';

function useFormInput(inititalValue='', _type='text') {
  const [value, setValue] = useState(inititalValue);
  const [type] = useState(_type);

  const handleChange = async (e) => {
    setValue(e.target.value);
  }
  return {
    value, 
    type,
    onChange: handleChange,
  };
}

export {useFormInput};