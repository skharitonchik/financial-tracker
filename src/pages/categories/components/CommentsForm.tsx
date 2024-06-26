import { FC, useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';

import { generate_uuidv4 } from '../../../utils';

import { CommentsFormInput } from './CommentsFormInput';

interface IList {
  id: string;
  value: string;
}

type CommentsFormProps = {
  addComments: (comments: any[]) => void;
  initialList?: any[];
};

export const CommentsForm: FC<CommentsFormProps> = ({ addComments, initialList }) => {
  const setId = () => generate_uuidv4();

  const [list, setList] = useState<any>(
    initialList
      ? initialList.map((i) => ({
          id: setId(),
          value: i,
        }))
      : [],
  );

  const addItem = () => {
    setList([
      ...list,
      {
        id: setId(),
        value: '',
      },
    ]);
  };

  const removeInput = (id: string) => {
    setList(list.filter((i: IList) => i.id !== id));
  };

  const saveValue = (id: string, value: string) => {
    setList(
      list.map((i: IList) => {
        if (i.id === id) {
          i.value = value;
        }

        return i;
      }),
    );
  };

  useEffect(() => addComments(list.map((i: IList) => i.value)), [list]);

  return (
    <>
      <Box>
        {list.map((i, index) => {
          return (
            <CommentsFormInput
              key={`comments-form-input-${index}`}
              id={i.id}
              removeInput={(id) => removeInput(id)}
              defaultValue={i.value}
              onChange={(v) => {
                saveValue(i.id, v);
              }}
            />
          );
        })}

        <Button sx={{ mt: 2 }} variant="outlined" onClick={addItem}>
          Add comment
        </Button>
      </Box>
    </>
  );
};
