import { FC, useState, useEffect } from 'react'
import { TextField, IconButton, ListItem, Box } from '@mui/material';
import Close from '@mui/icons-material/Close';

type CommentsFormInputProps = {
  id: string,
  removeInput: (id: string) => void,
  defaultValue: string,
  onChange: (value: string) => void,
};


export const CommentsFormInput: FC<CommentsFormInputProps> = ({
  id,
  removeInput,
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => setValue(defaultValue), [defaultValue])

  return (
    <Box
      sx={{display: 'flex', mt:2}}>
      <TextField
        id={id}
        size='small'
        fullWidth
        type='text'
        label="Input your comment"
        variant="outlined"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value)
        }}
      />
      <IconButton
        edge={'end'}
        onClick={() => removeInput(id)}
      >
        <Close/>
      </IconButton>
    </Box>
  )
}