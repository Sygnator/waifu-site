import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  pagination: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  error: {
    color: "#ff0000",
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
      <FormHelperText className={classes.error}>jakiś error</FormHelperText>
    </div>
  );
}

// ===============================================================


// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Button from '@material-ui/core/Button';
// import SaveIcon from '@material-ui/icons/Save';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     // "& .MuiInput-underline": {
//     //   borderBottom: "1px solid rgba(255, 255, 255, 0.40)",
//     // },
//     "& .MuiInput-underline::hover::not(.Mui-disabled)::before": {
//       borderBottom: "1px solid rgba(255, 0, 0, 0)",
//     }, 
//     "& .MuiInput-underline.Mui-error:after": {
//       borderBottom: "1px solid rgba(255, 0, 0, 0) !important",
//     },
//     "& .MuiInput-underline::before": {
//         borderBottom: "1px solid rgba(255, 255, 255, 0.40)",
//     },
//     "& .MuiInput-underline::after": {
//       borderBottom: "1px solid #3f51b5",
//     },
//   },
//   inputLabel: {
//     color: "#fff",
//   },
//   input: {
//     color: "#fff",
//   },
//   error: {
//     color: "#ff0000",
//   },
//   button: {
//     color: "#fff",
//     margin: theme.spacing(1),
//   },
// }));

// export default function InputAdornments() {
//   const classes = useStyles();
//   const [values, setValues] = React.useState(0);

//   const handleChange = (prop) => {
//     setValues(prop);
//   };

//   return (
//     <div className={classes.root}>
//       <div>
//         <InputLabel className={classes.inputLabel} >Kart na stronie:</InputLabel>
//           <Input
//             className={classes.input}
//             id="filled-adornment-weight"
//             value={values}
//             type="number"
//             onChange={(event)=>handleChange(event.target.value)}
//             error
//           />
//           <Button
//           size="small"
//           className={classes.button}
//           startIcon={<SaveIcon />}
//         >
//           Save
//         </Button>
//         <FormHelperText className={classes.error}>jakiś error</FormHelperText>
//       </div>
//     </div>
//   );
// }
