import { FC, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import { RadioGroup } from '../../../components';
import { useCategoryAdd } from '../../../hooks';
import { CommentsForm } from './CommentsForm';

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
  const [commentsList, setCommentsList] = useState<any>([]);

  const addCategory = () => {
    const color = categoryColor.current ? categoryColor.current.value : '';

    categoryAddMutate({
      requestData: {
        name: newCategory,
        type: categoryType,
        color,
        comments: commentsList.filter((c) => c),
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
          {CATEGORY_TYPES.map((c: any) => (
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

        <CommentsForm addComments={(newList) => setCommentsList(newList)} />

        <Button sx={{ mt: 2 }} variant="outlined" onClick={addCategory}>
          Add category
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};
