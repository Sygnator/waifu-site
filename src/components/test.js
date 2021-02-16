import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  pagination: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  ul: {
    justifyContent: 'center',
    '& li': {
      '& button, div': {
      color: "#fff",
      },
      textDecoration: "none",
    },
  }
}));

export default function PaginationControlled() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);

  const pageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className={classes.pagination}>
      <Pagination 
        count={15}
        page={page}
        onChange={pageChange}
        boundaryCount={2}
        classes={{ul: classes.ul}}
      />
    </div>
  );
}