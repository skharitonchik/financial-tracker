import { FC } from 'react'
import { Button, ButtonGroup } from '@mui/material';

type CommentsListProps = {
  list: string[],
  onClickHandler: (c: string) => void,
}

export const CommentsButtonsList: FC<CommentsListProps> = ({
  list,
  onClickHandler,
}) => {
  return (
    <ButtonGroup
      variant='text'
      aria-label="outlined button group"
    >
      {
        list.map((i, index) => (
          <Button
            key={`comments-button-${index}`}
            sx={{mr: 0.5}}
            variant='outlined'
            onClick={() => onClickHandler(i)}
            size='small'
          >
            {i}
          </Button>
        ))
      }
    </ButtonGroup>
  )
}