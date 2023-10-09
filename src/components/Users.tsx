import { FC, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useUsersData, useUserAdd } from '../hooks';

type UsersProps = {};

export const Users: FC<UsersProps> = () => {
  const [isLoadUsers, setIsLoadUsers] = useState(true);
  const { usersData, isLoadUsersSuccess } = useUsersData(isLoadUsers);
  const { userAddMutate, userAddData } = useUserAdd();
  const [newUser, setNewUser] = useState('');

  const addUser = () => {
    userAddMutate({
      requestData: {
        name: newUser,
      },
    });
  };

  useEffect(() => {
    setIsLoadUsers(true);
    setNewUser('');
  }, [userAddData]);

  useEffect(() => {
    if (isLoadUsersSuccess) {
      setIsLoadUsers(false);
    }
  }, [usersData]);

  return (
    <>
      <TextField
        value={newUser}
        size="small"
        fullWidth
        type="text"
        onChange={(e) => setNewUser(e.target.value)}
        label="New user"
        variant="outlined"
      />

      <Button sx={{ mt: 2 }} variant="outlined" onClick={addUser}>
        Add User
      </Button>
      <List>
        {isLoadUsersSuccess
          ? usersData.map((c: any) => {
              return (
                <ListItem key={c.id} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={c.name} />
                  </ListItemButton>
                </ListItem>
              );
            })
          : ''}
      </List>
    </>
  );
};
