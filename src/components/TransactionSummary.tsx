import { FC } from 'react';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

type TransactionSummaryProps = {
  filteredTransactions: {
    [key: string]: {
      plus: {
        [key: string]: {
          money: number;
          name: string;
        };
      };
      minus: {
        [key: string]: {
          money: number;
          name: string;
        };
      };
    };
  };
  date: string;
};

export const TransactionSummary: FC<TransactionSummaryProps> = ({ filteredTransactions, date }) => {
  return (
    <>
      <Typography sx={{ color: '#919EAB' }}>{dayjs(date).format('MMMM D, YYYY')}</Typography>
      {Object.keys(filteredTransactions[date].plus).map((pt, index) => {
        const money = filteredTransactions[date].plus[pt].money;
        const name = filteredTransactions[date].plus[pt].name;

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
        const money = filteredTransactions[date].minus[mt].money;
        const name = filteredTransactions[date].minus[mt].name;

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
