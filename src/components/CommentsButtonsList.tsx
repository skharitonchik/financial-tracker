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
        list.map((i) => (
          <Button
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