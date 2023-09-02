import { FC } from 'react'
import { Button, ListItem, ListItemText, Divider } from '@mui/material';

type CommentsListItemProps = {
  label: string,
  actionLabel: string,
  actionHandler: () => void,
}

export const CommentListItem: FC<CommentsListItemProps> = ({
  label,
  actionLabel,
  actionHandler,
}) => {

  return (
    <>
      <ListItem
      disablePadding
    >
      <ListItemText primary={label}/>
      <Button
        size='small'
        variant='outlined'
        onClick={actionHandler}
      >{actionLabel}</Button>
      </ListItem>
      <Divider/>
    </>
    
  )
}