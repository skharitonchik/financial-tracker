import { FC, useState, useRef, forwardRef} from 'react'
import { TextField, Box, IconButton, ListItem, Input } from '@mui/material';
import Close from '@mui/icons-material/Close';

type CommentsFormInputProps = {
  id: string,
  removeItem: (id: string) => void,
};


export const CommentsFormInput: FC<CommentsFormInputProps> = forwardRef((props, ref) => {
  const {id, removeItem} = props
  const [value, setValue] = useState('')

  return (
    <ListItem
      disablePadding>
      <TextField
        id={id}
        sx={{mt:2}}
        size='small'
        fullWidth
        type='text'
        label="Input your comment"
        variant="outlined"
        value={value}
        onChange={(e) => {setValue(e.target.value)}}
        inputRef={ref}
      />
      <IconButton
      edge={'end'}
      onClick={() => removeItem(id)}
      >
        <Close/>
      </IconButton>
    </ListItem>
  )
})