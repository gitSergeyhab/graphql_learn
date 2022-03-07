import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SaveIcon from '@material-ui/icons/Save';

import withHocs from './DirectorsFormHoc';
import { useMutation } from '@apollo/client';

import { addDirectorMutation, updateDirectorMutation } from './mutations';
import { directorsQuery } from '../DirectorsTable/queries'

const DirectorsForm = (props) => {

  const handleClose = () => props.onClose();

  const [updateDirector] = useMutation(updateDirectorMutation, { refetchQueries: [directorsQuery] })
  const [addDirector] = useMutation(addDirectorMutation, { refetchQueries: [directorsQuery] })


  const handleSave = () => {
    const { selectedValue, onClose } = props;
    const { id, name, age } = selectedValue;
    id ?
      updateDirector({ variables: {id, name,  age: Number(age)} }) :
      addDirector({ variables: {name, age: Number(age)} });
    onClose();
  };

    const { classes, open, handleChange, selectedValue = {} } = props;
    const { name, age } = selectedValue;

    return (
      <Dialog onClose={handleClose} open={open} aria-labelledby="simple-dialog-title">
        <DialogTitle className={classes.title} id="simple-dialog-title">Director information</DialogTitle>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Name"
            className={classes.textField}
            value={name}
            onChange={handleChange('name')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-rate"
            label="Age"
            className={classes.textField}
            value={age}
            onChange={handleChange('age')}
            type="number"
            margin="normal"
            variant="outlined"
          />
          <div className={classes.wrapper}>
            <Button onClick={handleSave} variant="contained" color="primary" className={classes.button}>
              <SaveIcon /> Save
            </Button>
          </div>
        </form>
      </Dialog>
    );
};

  export default withHocs(DirectorsForm);
