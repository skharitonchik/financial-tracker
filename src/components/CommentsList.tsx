import { FC, useEffect, useState } from 'react'
import { List, Box, Button } from '@mui/material';

import { CommentListItem } from './CommentListItem';

type CommentsListProps = {
  category: string,
  list: any[],
  removeComment: () => void,
}

export const CommentsList: FC<CommentsListProps> = ({
  category,
  list,
  removeComment,
}) => {

  const commentsList = new Array;
  const [checked, setChecked] = useState(false);
  const [disabled, setDisable] = useState(true);
  const [listForRemove, setListForRemove] = useState(new Array);

  const activateButton = () => {
    let checkCounter = 0

    for(let comment of commentsList) {
      if(comment.props.checked) {
        checkCounter++
        setListForRemove([...listForRemove, comment])
      }
    }

    if(checkCounter > 0) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }
  
  useEffect(activateButton)

  const createCommentsList = (list:any[]) => {
    for(let i=0; i<list.length; i++) {
      let item =
        <CommentListItem
          listElem={list[i]}
          checked={checked}
          onCheck={(state) => setChecked(state)}
        ></CommentListItem>
      commentsList.push(item)
    }
  }

  if(list) {
    createCommentsList(list)

    return (
      <Box sx={{mt: 2}}>
        <List id={`${category}-comments-list`}>
          {commentsList}
        </List>
        <Button
          size='small'
          variant='outlined'
          disabled={disabled}
          onClick={removeComment}
          >Remove
        </Button>
      </Box>
    )
  }
}