import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function changeTag(e) {
    console.log(e);
    if (e.choice === "assign") {
        e.choice = "reject";
      } else if (e.choice === "reject") {
        e.choice = null;
      } else {
        e.choice = "assign";
      }
  
      return { value: e.value, choice: e.choice };
  
}

function getStyles(tag, tagSelected, theme) {
  return {
    fontWeight:
        tagSelected.map((x)=>{
            return x.value
        }).indexOf(tag.value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
        //   color: name.choice === null ? "" : 
        //   name.choice === "assign" ? "green" :
        //   "red",

        //   color: tagSelected.map((o)=>{
        //       if(tag.value===o.value) {
        //         if(o.choice===null) return "blue"
        //         if(o.choice==="assign") return "green"
        //         if(o.choice==="reject") return "red"
        //       }
        //       return ""
        //   }),

        color: tagSelected.map((x)=>{
            return x.value
        }).indexOf(tag.value) === -1 ? "" : "green",
    };
}

export default function MultipleSelect({props, profileData}) {

    const { match, history } = props;
    const { params } = match;
    const { userID } = params;

  const classes = useStyles();
  const theme = useTheme();
  const [tagSelected, setTagSelected] = React.useState([]);

//   const tagsOptions = profileData.tagList;
  const tagsOptions =  profileData.tagList.map((o)=>{
        // return {value: o, choice: null}
        return {value: o, choice: null}
  });

  const handleChange = (event) => {
    const selectedOptions = event.target.value.map((x)=>JSON.parse(x))
    //.map((o)=>changeTag(o))
    setTagSelected(selectedOptions);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setTagSelected(value);
  };

  return (
    <div>
      <FormControl className={clsx(classes.formControl, classes.noLabel)}>
        <Select
          multiple
          displayEmpty
          value={tagSelected.map((x)=>JSON.stringify(x))}
          onChange={handleChange}
          input={<Input />}
          renderValue={() => <em>Tagi</em>}
        //   MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {tagsOptions.map((tag) => (
            <MenuItem key={tag.value} value={JSON.stringify(tag)} style={getStyles(tag, tagSelected, theme)}>
              {tag.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
