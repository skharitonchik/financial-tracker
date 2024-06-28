import { FC } from 'react'
import { List, ListItem, Stack, Box, Typography } from '@mui/material';

type CommentsListProps = {
  list: string[],
}

export const CommentsList: FC<CommentsListProps> = ({
  list,
}) => {
  return (
    <Box
    sx={{display: 'flex'}}>
      {
        list.map((i) => (
          <Typography
            sx={{color: 'grey', fontSize: 14, width: 'auto', mr: 1}}
          >
            {i}
          </Typography>
        ))
      }
    </Box>
  )
}