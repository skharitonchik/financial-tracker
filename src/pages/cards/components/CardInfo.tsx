import { FC, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, MenuItem, Select } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import { useUsersData } from '../../../hooks';

type CardInfoProps = {
  cardName: string;
  money: string;
  currency: string;
  user: string;
};

export const CardInfo: FC<CardInfoProps> = ({ cardName, user, money, currency }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { usersData, isLoadUsersSuccess } = useUsersData(isEdit);
  const [cardNameEdit, setCardNameEdit] = useState(cardName);
  const [cardUserEdit, setCardUserEdit] = useState(user);
  const [cardMoneyEdit, setCardMoneyEdit] = useState(money);

  if (isEdit) {
    return (
      <Card sx={{ width: 200, mr: 2, mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              value={cardNameEdit}
              size="small"
              fullWidth
              type="text"
              onChange={(e) => setCardNameEdit(e.target.value)}
              variant="outlined"
            />

            <IconButton onClick={() => setIsEdit(false)}>
              <SaveIcon></SaveIcon>
            </IconButton>
          </Box>
          <Box sx={{ mt: 1}}>
            {isLoadUsersSuccess ? (
              <Select
                sx={{ minWidth: '120px' }}
                labelId="card-user-edit"
                size="small"
                value={cardUserEdit}
                onChange={(e: any) => setCardUserEdit(e.target.value)}>
                {usersData.map((u, index) => (
                  <MenuItem key={`card-user-edit-item-${index}`} value={u.name}>
                    {u.name}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              ''
            )}
          </Box>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <TextField
              value={cardMoneyEdit}
              size="small"
              fullWidth
              type="text"
              onChange={(e) => setCardMoneyEdit(e.target.value)}
              variant="outlined"
            />
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontSize: 14, mt: 1, ml: 0.5 }}>
              {currency}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ width: 200, mr: 2, mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ mt: 0.5 }} variant="h5" component="div">
            {cardName}
          </Typography>

          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon></EditIcon>
          </IconButton>
        </Box>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {user}
        </Typography>
        <Box sx={{ display: 'inline' }}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontSize: 14 }}>
            {money}&nbsp;
            {currency}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
