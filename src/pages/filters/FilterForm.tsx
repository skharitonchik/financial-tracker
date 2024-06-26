import { FC, useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';

import { generate_uuidv4 } from '../../utils';
import { useFilterAdd, useFilterUpdate } from '../../hooks';

interface IFilter {
  id: string;
  name?: string;
  dateFrom?: any;
  dateTo?: any;
}

type FilterFormProps = {
  savedFilter?: {
    id: string;
    name: string;
    childFilters: IFilter[];
  };

  updateAction?: () => void;
};

export const FilterForm: FC<FilterFormProps> = ({ savedFilter, updateAction }) => {
  const { filterAddMutate, isLoadFiltersPostSuccess, filtersPostData } = useFilterAdd();
  const { filterUpdateMutate, filterUpdateData } = useFilterUpdate();
  const parentNameRef = useRef<HTMLInputElement>();
  const [childFilters, setChildFilters] = useState<IFilter[]>(
    savedFilter
      ? savedFilter.childFilters
      : [
          {
            id: generate_uuidv4(),
          },
        ],
  );

  const onSubmit = () => {
    if (savedFilter) {
      filterUpdateMutate({
        requestData: {
          id: savedFilter.id,
          name: parentNameRef?.current?.value,
          childFilters,
        },
      });

      return;
    }

    filterAddMutate({
      requestData: {
        name: parentNameRef.current?.value,
        childFilters,
      },
    });
  };

  useEffect(() => updateAction && updateAction(), [filtersPostData, filterUpdateData]);

  return (
    <>
      <TextField
        defaultValue={savedFilter ? savedFilter.name : ''}
        inputRef={parentNameRef}
        size="small"
        fullWidth
        type="text"
        label="Parent filter name"
        variant="outlined"
      />
      <Box>
        {childFilters.map((f, i) => {
          return (
            <Box 
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mt: 2}}
              key={`child-filter-${f.id}`} >
              <Box
                sx={{minWidth: "600px"}}>
                <TextField
                  defaultValue={f.name}
                  name={`child-filter-${f.id}`}
                  size="small"
                  type="text"
                  label="Child filter name"
                  onChange={({ target }) => {
                    const itemToChange = childFilters.find((i) => i.id === f.id);

                    if (itemToChange) {
                      itemToChange.name = target.value;
                    }
                  }}
                  variant="outlined"
                />

                <Box
                sx={{display: "flex", mt: 2}}>
                  <DatePicker
                    defaultValue={dayjs(f.dateFrom)}
                    slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }}
                    onChange={(e: any) => {
                      const itemToChange = childFilters.find((i) => i.id === f.id);

                      if (itemToChange) {
                        itemToChange.dateFrom = dayjs(e).format('YYYY-MM-DD');
                      }
                    }}
                    label="Date from"
                  />
                  <DatePicker
                    defaultValue={dayjs(f.dateTo)}
                    sx={{ ml: 2 }}
                    slotProps={{ textField: { size: 'small', fullWidth: true, error: false } }}
                    onChange={(e: any) => {
                      const itemToChange = childFilters.find((i) => i.id === f.id);

                      if (itemToChange) {
                        itemToChange.dateTo = dayjs(e).format('YYYY-MM-DD');
                      }
                    }}
                    label="Date to"
                  />
                </Box>
              </Box>

              <Button
                variant="outlined"
                onClick={() => setChildFilters((oldValue) => oldValue.filter((o) => o.id !== f.id))}>
                Remove
              </Button>
            </Box>
          );
        })}

        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          onClick={() => {
            setChildFilters((oldValue) => [
              ...oldValue,
              {
                id: generate_uuidv4(),
              },
            ]);
          }}>
          Add child filter
        </Button>
      </Box>

      <Button sx={{ mt: 2 }} variant="outlined" onClick={onSubmit}>
        {savedFilter ? 'Update Filter' : 'Save filter'}
      </Button>
    </>
  );
};
