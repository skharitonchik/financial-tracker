import { FC } from 'react'
import { List, ListItem, Stack, Button } from '@mui/material';

type CommentsListProps = {
  type?: string,
  list: any[],
  actionHandler?: (c: string) => void,
}

export const CommentsList: FC<CommentsListProps> = ({
  type,
  list,
  actionHandler,
}) => {

  const action = actionHandler ? actionHandler : () => {}

  if(type === 'buttons') {
    return (
      <List
        component={Stack}
        direction={'row'}
        useFlexGap
        flexWrap={'wrap'}
        disablePadding
      >
        {
          list.map((i) => (
            <Button
              variant="outlined"
              onClick={() => action(i)}
              size={'small'}
            >
              {i}
            </Button>
          ))
        }
      </List>
    )
  }

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
          disablePadding
          sx={{fontSize: 13, width: 80}}>
            {i}
          </ListItem>
        ))
      }
    </List>
  )
}