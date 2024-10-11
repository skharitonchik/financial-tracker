import { FC, useState, useRef, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useCategoryEdit } from '../../../hooks';
import { IconsDropdown, CategoryIcon } from '../../../components';
import { CommentsForm } from './CommentsForm';
import { CommentsList } from './CommentsList';

type CategoryListItemProps = {
  category: {
    id: string;
    type: number;
    name: string;
    color: string;
    comments: string[];
    icon: string;
  };
  onCategoryUpdate: () => void;
};

export const CategoryListItem: FC<CategoryListItemProps> = ({ category, onCategoryUpdate }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryIcon, setCategoryIcon] = useState(category.icon);

  const [updatedName, setUpdatedName] = useState(category.name);
  const categoryColor = useRef<HTMLInputElement>(null);
  const { categoryEditMutate, categoriesEditData } = useCategoryEdit();
  const [commentsList, setCommentsList] = useState(category.comments ?? []);

  const parseCategoryType = (typeId) => {
    switch (typeId) {
      case 0:
        return 'Расход';
      case 1:
        return 'Доход';
      case 2:
        return 'Перевод';
    }
  };

  const updateCategory = () => {
    categoryEditMutate({
      requestData: {
        ...category,
        name: updatedName,
        color: categoryColor?.current?.value,
        icon: categoryIcon,
        comments: commentsList.filter((c) => c),
      },
    });
    setIsEditMode(false);
  };

  useEffect(() => {
    onCategoryUpdate();
  }, [categoriesEditData]);

  if (isEditMode) {
    return (
      <>
        <ListItem
          disablePadding
          secondaryAction={
            <IconButton edge="end" aria-label="comments" onClick={updateCategory}>
              <AddCircleIcon />
            </IconButton>
          }>
          <Box sx={{ m: 2, ml: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconsDropdown activeIcon={categoryIcon} onIconChange={(selectedIcon) => setCategoryIcon(selectedIcon)} />
              <TextField
                sx={{ ml: 1 }}
                defaultValue={category.name}
                onChange={({ target }) => setUpdatedName(target.value)}
                size="small"
                fullWidth
                type="text"
                label="Category name"
                variant="outlined"
              />
              <Box sx={{ ml: 2 }}>
                <input
                  type="color"
                  defaultValue={category.color}
                  ref={categoryColor}
                  onChange={({ target }) => {
                    console.info('%c  SERGEY colorChange', 'background: #222; color: #bada55', target.value);
                  }}
                />
              </Box>
            </Box>
            <CommentsForm
              addComments={(newList) => setCommentsList(newList)}
              initialList={commentsList.length > 0 ? commentsList : undefined}
            />
          </Box>
        </ListItem>
      </>
    );
  }

  return (
    <>
      <ListItem
        key={category.id}
        disablePadding
        secondaryAction={
          <IconButton edge="end" aria-label="comments" onClick={() => setIsEditMode(true)}>
            <EditIcon />
          </IconButton>
        }>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>
              <CategoryIcon iconType={categoryIcon} color={category.color} />
            </Avatar>
          </ListItemAvatar>
          <Box>
            <ListItemText
              sx={{ color: category.type === 0 ? '#FF4842' : '' || category.type === 1 ? '#008c7e' : '', margin: 0 }}
              primary={category.name}
              secondary={parseCategoryType(category.type)}
            />
            <CommentsList list={commentsList} />
          </Box>
        </ListItemButton>
      </ListItem>
    </>
  );
};
