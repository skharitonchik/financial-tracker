import { FC } from 'react'
import { List, ListItem, Stack } from '@mui/material';

type CommentsListProps = {
  list: string[],
}

export const CommentsList: FC<CommentsListProps> = ({
  list,
}) => {
  return (
    <List
      component={Stack}
      direction={'row'}
      useFlexGap
      disablePadding
    >
      {
        list.map((i) => (
          <ListItem
            sx={{color: 'grey', fontSize: 14, width: 'auto', mr: 1}}
            disablePadding
          >
            {i}
          </ListItem>
        ))
      }
    </List>
  )
}