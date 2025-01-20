import { FC } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { CategoryIcon } from '../../../components';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

type CategoriesDropdownProps = {
  onChange: (selectedCategory: string) => void;
  filteredCategories: any[];
  activeItemValue: string;
};

export const CategoriesDropdown: FC<CategoriesDropdownProps> = ({ onChange, filteredCategories, activeItemValue }) => {
  const categoryChange = (event) => {
    if (typeof onChange === 'function') {
      onChange(event.target.value);
    }
  };

  return (
    <>
      <InputLabel id="category-select">Category *</InputLabel>
      <Select
        sx={{ width: '100%' }}
        labelId="category-select"
        id="category-select"
        value={activeItemValue}
        label="Category *"
        onChange={categoryChange}
        variant={'outlined'}>
        {filteredCategories.map((c: any) => (
          <MenuItem key={c.id} value={c.id}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <CategoryIcon iconType={c.icon} color={c.color} />
              <Typography sx={{ ml: 2 }}>{c.name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
