import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTransactionsByDayData, useUsersData, useCategoriesData, useFilteredTransactions } from '../../hooks';
import dayjs, { Dayjs } from 'dayjs';

import { RadioGroup } from '../RadioGroup';
import { TransactionTable } from './TransactionTable';
import { TransactionTransferForm } from './components/TransactionTransferForm';
import { TransactionAddForm } from './components/TransactionAddForm';
import { FiltersCard } from '../dashboard/components/FiltersCard';

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
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(dayjs(''));
  const [dateTo, setDateTo] = useState<Dayjs | null>(dayjs(''));
  const [isLoadUsers, setIsLoadUsers] = useState(true);
  const [isLoadCategories, setIsLoadCategories] = useState(true);
  const { usersData, isLoadUsersSuccess } = useUsersData(isLoadUsers);
  const { categoriesData, isLoadCategoriesSuccess } = useCategoriesData(isLoadCategories);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const onTransactionUpdateAction = () => setIsLoadTransactions(true);

  const {filteredTransactionsData, filteredTransactionsMutate } = useFilteredTransactions()

  const getFilteredTransactions = () => {
    filteredTransactionsMutate({
      requestData: {
        user: selectedUser,
        category: selectedCategory,
      },
    });
  }

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
    setIsLoadTransactions(false);
  }, [transactionsByDayData]);

  return (
    <>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="filterpanel-content" id="filterpanel-header">
          <Typography>Filter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FiltersCard onDateFromUpdate={(value) => setDateFrom(value)} onDateToUpdate={(value) => setDateTo(value)} />
          <FormControl>
            <InputLabel
              id={"filter-user-select-label"}>
              User
            </InputLabel>
            <Select
              sx={{minWidth: "120px"}}
              labelId="filter-user-select-label"
              label="User"
              size="small"
              value={selectedUser !== '' ? selectedUser : 'Any'}
              onChange={(e: any) => e.target.value !== 'Any' ? setSelectedUser(e.target.value) : setSelectedUser('')}
            >
              <MenuItem
                key={`filter-user-select-item-empty`}
                value={'Any'}
                >{'Any'}
              </MenuItem>
              {isLoadUsersSuccess
                ? usersData.map((u, index) => (
                  <MenuItem
                    key={`filter-user-select-item-${index}`}
                    value={u.name}
                    >{u.name}
                  </MenuItem>
                ))
                : ''}
            </Select>
          </FormControl>

          <FormControl
            sx={{ ml: 2 }}>
            <InputLabel id={"filter-category-select-label"}>
              Category
            </InputLabel>
            <Select
              sx={{minWidth: "120px"}}
              labelId="filter-category-select-label"
              label="Category"
              size="small"
              value={selectedCategory !== '' ? selectedCategory : 'Any'}
              onChange={(e: any) => e.target.value !== 'Any' ? setSelectedCategory(e.target.value) : setSelectedCategory('')}
            >
              <MenuItem
                key={`filter-user-select-item-empty`}
                value={'Any'}
                >{'Any'}
              </MenuItem>
              {isLoadCategoriesSuccess
                ? categoriesData.map((c, index) => (
                  <MenuItem
                    key={`filter-category-select-item-${index}`}
                    value={c.id}
                    >{c.name}
                  </MenuItem>
                ))
                : ''}
            </Select>
          </FormControl>
          <Button
            sx={{height: "40px", ml: 2}}
            variant="outlined"
            onClick={getFilteredTransactions}
          >Filter
          </Button>
        </AccordionDetails>
      </Accordion>
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

      <TransactionTable transactions={filteredTransactionsData ? filteredTransactionsData : transactionsByDayData}/>
    </>
  );
};
