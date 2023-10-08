import { FC, useState, useEffect } from 'react'
import { Button, Box } from '@mui/material';

import { CommentsFormInput } from './CommentsFormInput';

type CommentsFormProps = {
  addComments: (comments: any[]) => void,
  initialList?: any[]
};

export const CommentsForm: FC<CommentsFormProps> = ({
  addComments,
  initialList,
}) => {
  const [isList, setIsList] = useState(initialList ? true : false)
  const setId = () => (Math.round(Math.random() * 100000)).toString()

  const [list, setList] = useState<any>(
    initialList
    ? initialList.map((i) => ({
        id: setId(),
        value: i
      }))
    : []
  )

  const addItem = () => {
    setList([...list, {
      id: setId(), 
      value: '',
    }])
  }

  const removeInput = (id: string) => {
    setList(list.filter((i:{id: string, value: string}) => i.id !== id))
  }

  const saveValue = (id: string, value: string) => {
    setList(list.map((i:{id: string, value: string}) => {
      if(i.id === id) {
        i.value = value
      }

      return i
    }))
  }

  useEffect(() => addComments(list.map((i:{id: string, value: string}) => i.value)), [list])

  if(!isList || list.length == 0) {
    return (
      <Box>
        <Button
          sx={{mt: 2}}
          variant='outlined'
          onClick={() => {setIsList(true); addItem()}}
        >Add comment</Button>
      </Box>
    )
  }

  return (
    <>
      <Box>
        {
          list.map((i) => {
            return (
              <CommentsFormInput
                id={i.id}
                removeInput={(id) => removeInput(id)}
                defaultValue={i.value}
                onChange={(v) => {saveValue(i.id, v)}}
              />
            )
          })
        }

        <Button
          sx={{mt: 2}}
          variant='outlined'
          onClick={addItem}
        >One more comment
        </Button>
      </Box>
    </>
  )
}
