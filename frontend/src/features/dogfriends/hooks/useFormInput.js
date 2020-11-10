import {useState} from 'react';
function useFormInput(initialValue='text') {
  const [value, setValue] = useState("");
  const [type] = useState(initialValue);

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