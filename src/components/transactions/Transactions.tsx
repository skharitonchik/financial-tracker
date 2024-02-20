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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

const SAVED_FILTERS = [
  {
    value: 0,
    name: '7 days',
  },
  {
    value: 1,
    name: '1 month',
  },
  {
    value: 2,
    name: '3 month',
  },
  {
    value: 3,
    name: '6 month',
  },
];

type TransactionsProps = {};

export const Transactions: FC<TransactionsProps> = () => {
  const [isLoadTransactions, setIsLoadTransactions] = useState(true);
  const { transactionsByDayData } = useTransactionsByDayData(isLoadTransactions);
  const [categoryType, setCategoryType] = useState(0);
  const [savedFilter, setSavedFilter] = useState(0);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(dayjs(''));
  const [dateTo, setDateTo] = useState<Dayjs | null>(dayjs(''));
  const [isLoadUsers, setIsLoadUsers] = useState(true);
  const [isLoadCategories, setIsLoadCategories] = useState(true);
  const { usersData, isLoadUsersSuccess } = useUsersData(isLoadUsers);
  const { categoriesData, isLoadCategoriesSuccess } = useCategoriesData(isLoadCategories);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const onTransactionUpdateAction = () => setIsLoadTransactions(true);

  const { filteredTransactionsData, filteredTransactionsMutate } = useFilteredTransactions();

  const convertSavedFilters = () => {
    const today = new Date();
    const setDates = (daysAgoCount) => {
      const daysAgo = new Date();
      daysAgo.setDate(today.getDate() - daysAgoCount);
      setDateFrom(dayjs(daysAgo));
      setDateTo(dayjs(today));
    };

    switch (savedFilter) {
      case 0:
        setDates(7);
        break;
      case 1:
        setDates(31);
        break;
      case 2:
        setDates(90);
        break;
      case 3:
        setDates(180);
        break;
    }
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
    setIsLoadTransactions(false);
  }, [transactionsByDayData]);

  useEffect(() => {
    convertSavedFilters();
  }, [savedFilter]);

  useEffect(() => {
    filteredTransactionsMutate({
      requestData: {
        user: selectedUser,
        category: selectedCategory,
        dateFrom, dateTo
      },
    });
  }, [selectedUser, selectedCategory, dateTo, dateFrom]);

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

      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="filterpanel-content" id="filterpanel-header">
          <Typography>Filter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 2 }}>
            {SAVED_FILTERS.map((c: any) => (
              <RadioGroup
                key={c.value}
                inline={true}
                value={c.value}
                activeItem={savedFilter}
                activeItemChange={(value: string) => setSavedFilter(parseInt(value))}
                label={c.name}
              />
            ))}
          </Box>
          <Box sx={{ mb: 2 }}>
            <DatePicker label="Date from" value={dateFrom}
                        onChange={(newValue: Dayjs | null) => setDateFrom(newValue)} />
            <DatePicker
              sx={{ ml: 2 }}
              label="Date to"
              value={dateTo}
              onChange={(newValue: Dayjs | null) => setDateTo(newValue)}
            />
          </Box>
          <FormControl>
            <InputLabel
              id={'filter-user-select-label'}>
              User
            </InputLabel>
            <Select
              sx={{ minWidth: '120px' }}
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
            <InputLabel id={'filter-category-select-label'}>
              Category
            </InputLabel>
            <Select
              sx={{ minWidth: '120px' }}
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
        </AccordionDetails>
      </Accordion>

      <TransactionTable transactions={filteredTransactionsData ? filteredTransactionsData : transactionsByDayData} />
    </>
  );
};
