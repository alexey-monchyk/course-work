import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { TextField } from '@material-ui/core';

const FirstStep = forwardRef((props, ref) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const changeTitle = (e) => setTitle(e.target.value);
  const changeDescription = (e) => setDescription(e.target.value);

  useImperativeHandle(ref, () => ({
    checkFields: () => {
      if (title.length < 3) return props.showError('Title must be at least 3 symbols.'); 
      if (description.length < 10) return props.showError('Description must be at least 10 symbols.'); 
      if (description.length >= 255) return props.showError('Description must be less than 255 symbols.');
      if (title.length >= 255) return props.showError('Title must be less than 255 symbols.');
      
      props.setDescription(description);
      props.setTitle(title);
      props.handleNext();
    }
  }));

  return (
    <div>
      <TextField
        variant='outlined'
        label='Title'
        margin="dense"
        value={title}
        onChange={changeTitle}
        fullWidth
      />
      <TextField
        multiline
        rowsMax="4"
        rows="4"
        margin="dense"
        variant='outlined'
        label='Description'
        value={description}
        onChange={changeDescription}
        fullWidth
      />
    </div>
  );
});

export default FirstStep;