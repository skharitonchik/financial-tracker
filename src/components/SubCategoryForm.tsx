import { FC, useState, useEffect } from 'react'
import { Button, TextField, List, ListItem, Typography } from '@mui/material';
import { CategoryListItem } from './CategoryListItem';

export const SubCategoryForm = () => {
  const [subCategory, setSubCategory] = useState('')
  const [subCategoryList, setSubCategoryList] = useState(new Array())

  return (
    <>
      <TextField
        sx={{ml: 1}}
        size='small'
        fullWidth
        type='text'
        onChange={(e) => {setSubCategory(e.target.value)}}
        label="Subcategory name"
        variant="outlined"
      />
      <Button
      sx={{ml: 1, height: 40}}
      size='small'
      fullWidth
      variant='outlined'
      onClick={() => {setSubCategoryList([...subCategoryList, subCategory])}}
      >
        Add subcategory
      </Button>
      <Typography>{subCategoryList.toString().split(',').join(' ')}</Typography>
    </>
  )
}