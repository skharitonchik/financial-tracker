import { FC } from 'react'
import { List, ListItem, Stack, Button, ButtonGroup } from '@mui/material';

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
      <ButtonGroup
        variant='text'
        aria-label="outlined button group"
      >
        {
          list.map((i) => (
            <Button
              variant='outlined'
              onClick={() => action(i)}
              size='small'
            >
              {i}
            </Button>
          ))
        }
      </ButtonGroup>
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