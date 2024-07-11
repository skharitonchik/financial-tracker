import { FC } from 'react';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

type TransactionSummaryProps = {
  filteredTransactions: {
    [key: string]: {
      plus: {
        [key: string]: number;
      };
      minus: {
        [key: string]: number;
      };
    };
  };
  date: string;
};

export const TransactionSummary: FC<TransactionSummaryProps> = ({ filteredTransactions, date }) => {
  return (
    <>
      <Typography sx={{ color: '#919EAB', minWidth: 135 }}>{dayjs(date).format('MMMM D, YYYY')}</Typography>
      {Object.keys(filteredTransactions[date].plus).map((pt, index) => {
        const money = filteredTransactions[date].plus[pt];
        const name = pt;

        if (money === 0) {
          return '';
        }

        return (
          <Typography key={`${pt}-${index}`} sx={{ ml: 3, color: '#008c7e', display: 'inline-flex' }}>
            {money.toFixed(2)} {name}
          </Typography>
        );
      })}
      {Object.keys(filteredTransactions[date].minus).map((mt, index) => {
        const money = filteredTransactions[date].minus[mt];
        const name = mt;

        if (money === 0) {
          return '';
        }

        return (
          <Typography key={`${mt}-${index}`} sx={{ ml: 3, color: '#FF4842', display: 'inline-flex' }}>
            {money.toFixed(2)} {name}
          </Typography>
        );
      })}
    </>
  );
};
