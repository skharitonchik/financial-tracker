import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useUsersData, useCategoriesData, useFilteredTransactions } from '../../hooks';

import { RadioGroup } from '../../components';
import { TransactionTable, TransactionAddForm, TransactionTransferForm, TransactionsFilter } from './components';

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
  const [transactions, setTransactions] = useState<any>([]);
  const [filteredPlus, setFilteredPlus] = useState({});
  const [filteredMinus, setFilteredMinus] = useState({});
  const [categoryType, setCategoryType] = useState(0);
  const [isLoadUsers, setIsLoadUsers] = useState(true);
  const [isLoadCategories, setIsLoadCategories] = useState(true);
  const { usersData, isLoadUsersSuccess } = useUsersData(isLoadUsers);
  const { categoriesData, isLoadCategoriesSuccess } = useCategoriesData(isLoadCategories);
  const {
    filteredTransactionsData,
    filteredTransactionsMutate,
    isFilteredTransactionsDataSuccess,
  } = useFilteredTransactions();

  const onTransactionUpdateAction = () => setIsLoadTransactions(true);
  const loadFilteredTransactions = (config: {
    selectedUser: string,
    selectedCategory: string,
    dateTo: any,
    dateFrom: any
  }) => {
    const {selectedUser, selectedCategory, dateFrom, dateTo} = config;

    filteredTransactionsMutate({
      requestData: {
        user: selectedUser,
        category: selectedCategory,
        dateFrom, dateTo,
      },
    });
  };

  useEffect(() => {
    if (isLoadUsersSuccess) {
      setIsLoadUsers(false);
    }
  }, [usersData]);

  useEffect(() => {
    if (isLoadCategoriesSuccess) {
      setIsLoadCategories(false);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (isFilteredTransactionsDataSuccess) {
      const { dateGroups, allPlus, allMinus } = filteredTransactionsData;
      setIsLoadTransactions(false);
      setFilteredPlus(allPlus);
      setFilteredMinus(allMinus);
      setTransactions(dateGroups ?? []);
    }
  }, [filteredTransactionsData]);

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

      <TransactionsFilter categoriesData={categoriesData ?? []} usersData={usersData ?? []} filteredMinus={filteredMinus} filteredPlus={filteredPlus} updateFilters={loadFilteredTransactions}/>
      <TransactionTable transactions={transactions} />
    </>
  );
};
