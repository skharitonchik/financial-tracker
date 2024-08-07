import { FC, useEffect, useState } from 'react';
import List from '@mui/material/List';

import { useCategoriesData } from '../../hooks';
import { CategoryListItem, CategoryForm } from './components';

type CategoriesProps = {};

export const Categories: FC<CategoriesProps> = () => {
  const [isLoadCategories, setIsLoadCategories] = useState(true);
  const { categoriesData, isLoadCategoriesSuccess } = useCategoriesData(isLoadCategories);
  const updateCategoriesList = () => setIsLoadCategories(true);

  useEffect(() => {
    if (isLoadCategoriesSuccess) {
      setIsLoadCategories(false);
    }
  }, [categoriesData]);

  return (
    <>
      <CategoryForm onCategoryAdd={updateCategoriesList} />
      <List>
        {isLoadCategoriesSuccess
          ? categoriesData.map((c: any) => (
              <CategoryListItem onCategoryUpdate={updateCategoriesList} key={c.id} category={c} />
            ))
          : ''}
      </List>
    </>
  );
};
