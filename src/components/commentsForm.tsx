import { FC, useState, useRef, useEffect, forwardRef } from 'react'
import { Button, Box } from '@mui/material';

import { CommentsFormInput } from './CommentsFormInput';

type CommentsFormProps = {
  addComments: (comments: any[]) => void,
};

export const CommentsForm = ({
  addComments,
}) => {
  const [isList, setIsList] = useState(false)
  const setId = () => {1
    return (
      (Math.round(Math.random() * 10000)).toString()
    )
  }
  const input = 
    <CommentsFormInput
      id={setId()}
      //removeItem={(id) => setInputsList(inputsList.filter((i) => i != id))}
      removeItem={() => console.log(inputsList)}
    />

  const [inputsList, setInputsList] = useState<any>([input])

  useEffect(() => console.log(inputsList), [inputsList])

  if(!isList) {
    return (
      <Box>
        <Button
          sx={{mt: 2}}
          variant='outlined'
          onClick={() => setIsList(true)}
        >Add comment</Button>
      </Box>
    )
  }

  return (
    <>
      <Box>
        {inputsList}

        <Button
          sx={{mt: 2}}
          variant='outlined'
          onClick={() => setInputsList([...inputsList, input])}
        >One more comment
        </Button>
      </Box>
    </>
  )
}