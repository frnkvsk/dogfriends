import {useEffect, useState} from 'react';
import { selectUser } from '../dogfriendsUserSlice';
import { useSelector } from 'react-redux';

function useFormInput(name='none', inititalValue='', _type='text') {
  
  const [type] = useState(_type);
  const userList = useSelector(selectUser);
  const [value, setValue] = useState(userList.status === 'fulfilled' && name !== 'none' ? userList.data.user[name] : inititalValue);

  useEffect(() => {
    console.log('userFormInput useEffect', userList.status)
    if(userList.status === 'fulfilled' && name !== 'none')
      setValue(userList.data.user[name]);
      // eslint-disable-next-line
  }, [userList.status]);

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