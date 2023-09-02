import { FC, useState } from 'react'
import { Button, TextField, Box } from '@mui/material';

type CommentsFormProps = {
  addComment: (comment: string) => void,
};

export const CommentsForm: FC<CommentsFormProps> = ({
  addComment,
}) => {
  const input = <TextField
    sx={{mt:2}}
    size='small'
    fullWidth
    type='text'
    onChange={(e) => {setComment(e.target.value)}}
    label="Input your comment"
    variant="outlined"
  />

  const [inputsList, addInput] = useState([input]) //почему не работает [] вместо new Array (not iterable)
  const [comment, setComment] = useState('');

  return (
    <>
      <Box>
        {inputsList}
        <Button
          sx={{mt: 2, height: 40}}
          size='small'
          variant='outlined'
          onClick={() => {
            addInput([...inputsList, input]);
            addComment(comment)
            }
          }
        >One more comment
        </Button>
        <Button
          sx={{ml: 1, mt: 2, height: 40}}
          size='small'
          variant='outlined'
          onClick={() => {addComment(comment)}}
        >Save comments
        </Button>
      </Box>
    </>
  )
}