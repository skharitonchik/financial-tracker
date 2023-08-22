import { FC, useState } from 'react'
import { Checkbox, ListItem, ListItemText } from '@mui/material';

type CommentsListItemProps = {
  listElem: string,
  checked: boolean,
  onCheck: (e: boolean) => void,
}

export const CommentListItem: FC<CommentsListItemProps> = ({
  listElem,
  checked,
  onCheck,
}) => {
  const [newState, setNewState] = useState(checked)

  return (
    <ListItem
      id={`comment-${listElem}`}
    >
      <Checkbox checked={newState} onChange={(e) => {onCheck(e.target.checked); setNewState(e.target.checked)}}/>
      <ListItemText primary={listElem}/>
    </ListItem>
  )
}