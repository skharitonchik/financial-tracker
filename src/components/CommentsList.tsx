import { FC } from 'react'
import { List, Box } from '@mui/material';

import { CommentListItem } from './CommentListItem';

type CommentsListProps = {
  category: string,
  list: any[],
  actionLabel: string,
  actionHandler: (c: any) => void,
}

export const CommentsList: FC<CommentsListProps> = ({
  category,
  list,
  actionLabel,
  actionHandler,
}) => {

  if(list.length > 0) {
    return (
      <Box sx={{mt: 2}}>
        <List
          id={`${category}-comments-list`}
          disablePadding
        >
          {
            list.map((i) => (
              <CommentListItem
                label={i}
                actionLabel={actionLabel}
                actionHandler={() => actionHandler(i)}
              />
            ))
          }
        </List>
      </Box>
    )
  } else {
    return null
  }
}