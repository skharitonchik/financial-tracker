import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useTransactionsByDayData } from '../../hooks';

import { RadioGroup } from '../RadioGroup';
import { TransactionTable } from './TransactionTable';
import { TransactionTransferForm } from './components/TransactionTransferForm';
import { TransactionAddForm } from './components/TransactionAddForm';

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

type TransactionsProps = {};

export const Transactions: FC<TransactionsProps> = () => {
  const [isLoadTransactions, setIsLoadTransactions] = useState(true);
  const { transactionsByDayData } = useTransactionsByDayData(isLoadTransactions);
  const [categoryType, setCategoryType] = useState(0);

  const onTransactionUpdateAction = () => setIsLoadTransactions(true);

  useEffect(() => {
    setIsLoadTransactions(false);
  }, [transactionsByDayData]);

  return (
    <>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Add new Transaction</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 2 }}>
            {CATEGORY_TYPES.map((c: any) => (
              <RadioGroup
                key={c.value}
                inline={true}
                value={c.value}
                activeItem={categoryType}
                activeItemChange={(value: string) => setCategoryType(parseInt(value))}
                label={c.name}
              />
            ))}
          </Box>
          {categoryType === 0 || categoryType === 1 ? (
            <TransactionAddForm categoryType={categoryType} onTransactionAdd={onTransactionUpdateAction} />
          ) : (
            ''
          )}
          {categoryType === 2 ? <TransactionTransferForm onTransactionTransfer={onTransactionUpdateAction} /> : ''}
        </AccordionDetails>
      </Accordion>

      <TransactionTable transactions={transactionsByDayData} />
    </>
  );
};
