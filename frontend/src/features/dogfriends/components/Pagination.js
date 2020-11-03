import React, { useEffect } from 'react';
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

export default function PaginationComp({pageCount}) {  
  const classes = useStyles();
  const dispatch = useDispatch();
  const pageCountContext = useSelector(selectPageCount)
  let {pagesTotal, pageCurr} = pageCountContext;
  const [page, setPage] = React.useState(0);

  useEffect(() => {
    dispatch(setPages({
      pagesTotal: pageCount,
      pageCurr: page,
    }));
  }, [page, pageCount, dispatch]);
  
  const handleChange = (event, value) => {
    setPage(value - 1);
  }
  
  return (
    <div className={classes.root}>
      <Typography>Page: {pageCurr+1}</Typography>
      <Pagination 
        count={pagesTotal%10 ? ~~(pagesTotal/10)+1 : ~~(pagesTotal/10)} 
        page={+pageCurr+1} 
        onChange={handleChange}/>
    </div> 
  );
}
