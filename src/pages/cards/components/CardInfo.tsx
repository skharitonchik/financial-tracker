import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type CardInfoProps = {
  cardName: string;
  money: string;
  currency: string;
  user: string;
};

export const CardInfo: FC<CardInfoProps> = ({ cardName, user, money, currency }) => {
  return (
    <Card sx={{ width: 200, mr: 2, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {cardName}
        </Typography>
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
