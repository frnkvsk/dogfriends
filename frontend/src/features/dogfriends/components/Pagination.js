import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { 
  setPages,
  selectPageCount,
 } from '../dogfriendsPageCountSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
  },
}));

export default function PaginationComp({pageCount, posts_per_page}) {  
  const classes = useStyles();
  const dispatch = useDispatch();
  
  let {pagesTotal, pageCurr} = useSelector(selectPageCount);
  const [page, setPage] = React.useState(0);

  // const [currentPages, setCurrentPages] = useState({
  //   from: pageCurr * posts_per_page,
  //   to: pageCurr * posts_per_page + posts_per_page,
  // });

  useEffect(() => {
    dispatch(setPages({
      pagesTotal: pageCount,
      pageCurr: page,
    }));
  }, [page, pageCount, dispatch]);
  
  const handleChange = (event, value) => {
    setPage(value - 1);
  }
  console.log('Pagination pagesTotal, pageCurr',pagesTotal, pageCurr)
  return (
    <div className={classes.root}>
      <Typography>Page: {pageCurr+1}</Typography>
      <Pagination 
        count={pagesTotal%posts_per_page ? ~~(pagesTotal/posts_per_page)+1 : ~~(pagesTotal/posts_per_page)} 
        page={+pageCurr+1} 
        onChange={handleChange}/>
    </div> 
  );
}
