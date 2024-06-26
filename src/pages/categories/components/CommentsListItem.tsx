import { FC, useState, useEffect } from 'react'
import { Button, ListItem, ListItemText, Divider, TextField, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';

type CommentsListItemProps = {
  mode?: string,
  itemValue: string,
  removeHandler?: () => void,
  changeHandler: (c: any) => void,
}

export const CommentListItem: FC<CommentsListItemProps> = ({
  mode,
  itemValue,
  removeHandler,
  changeHandler,
}) => {
  const [value, setValue] = useState(itemValue)

  const setNewValue = (value) => {
    changeHandler(value)
  }

  if(mode === 'button') {
    return (
      <>
        <ListItem
        disablePadding
        >
        <ListItemText primary={itemValue}/>
        <Button
          size='small'
          variant='outlined'
          onClick={removeHandler}
        >{itemValue}</Button>
        </ListItem>
      </>
    )
  }

  return (
    <ListItem
      sx={{mt: 2}}
      disablePadding>
      <TextField
        size='small'
        value={value}
        onChange={(e) => {setValue(e.target.value); setNewValue(e.target.value)}}
        fullWidth
      />
      <IconButton
        edge='end'
        onClick={removeHandler}
      >
        <Close />
      </IconButton>
    </ListItem>
  )
}