import { FC, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import { RadioGroup } from './RadioGroup';
import { useCategoryAdd } from '../hooks';

const CATEGORY_TYPES = [
  {
    value: 0,
    name: 'Расход',
  },
  {
    value: 1,
    name: 'Доход',
  },
  {
    value: 2,
    name: 'Перевод',
  },
];

type CategoryFormProps = {
  onCategoryAdd: () => void;
};

export const CategoryForm: FC<CategoryFormProps> = ({ onCategoryAdd }) => {
  const [newCategory, setNewCategory] = useState('');
  const [categoryType, setCategoryType] = useState(0);
  const categoryColor = useRef<HTMLInputElement>(null);
  const { categoryAddMutate, categoriesPostData } = useCategoryAdd();
  //for comments
  const input = <TextField
    sx={{mt:2}}
    size='small'
    fullWidth
    type='text'
    onChange={(e) => {setComment(e.target.value)}}
    label="Input your comment"
    variant="outlined"
  />
  const [inputsList, addInput] = useState(new Array(input)) //почему не работает [] вместо new Array (not iterable)
  const [comment, setComment] = useState('');
  const [commentsList, addComment] = useState(new Array); //почему не работает [] вместо new Array (not iterable)

  const addCategory = () => {
    const color = categoryColor.current ? categoryColor.current.value : '';

    categoryAddMutate({
      requestData: {
        name: newCategory,
        type: categoryType,
        color,
        comments: commentsList,
      },
    });
  };

  useEffect(() => onCategoryAdd(), [categoriesPostData]);

  return (
    <Accordion sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>Add new Category</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex' }}>
          <TextField
            value={newCategory}
            size="small"
            fullWidth
            type="text"
            onChange={(e) => setNewCategory(e.target.value)}
            label="New category name"
            variant="outlined"
          />
          <Box sx={{ ml: 3, mt: 1 }}>
            <input
              type="color"
              ref={categoryColor}
              onChange={({ target }) => {
                console.info('%c  SERGEY colorChange', 'background: #222; color: #bada55', target.value);
                console.info('%c  SERGEY categoryColor', 'background: #222; color: #bada55', categoryColor);
              }}
            />
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          {CATEGORY_TYPES.map((c: any, i: number) => (
            <RadioGroup
              key={c.value}
              inline={true}
              value={c.value}
              activeItem={categoryType}
              activeItemChange={(v) => setCategoryType(parseInt(v))}
              label={c.name}
            />
          ))}
        </Box>
        
        <Box>
          {inputsList}
          <Button
            sx={{mt: 2, height: 40}}
            size='small'
            variant='outlined'
            onClick={() => {
              addInput([...inputsList, input]);
              addComment([...commentsList, comment])}
            }
          >One more comment
          </Button>
          <Button
            sx={{ml: 1, mt: 2, height: 40}}
            size='small'
            variant='outlined'
            onClick={() => addComment([...commentsList, comment])}
          >Save comments
          </Button>
        </Box>

        <Button sx={{ mt: 2 }} variant="outlined" onClick={addCategory}>
          Add category
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};
