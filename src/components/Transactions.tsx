import { FC, useEffect, useState, ChangeEvent, useRef } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {
  useTransactionsData,
  useTransactionAdd,
  useTransactionTransferAdd,
  useUsersData,
  useCurrenciesData,
  useCardsData,
  useCategoriesData,
} from '../hooks';

import { RadioGroup } from './RadioGroup';
import { TransactionTable } from './TransactionTable';
import { CommentsList } from './CommentsList';

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
  const { currenciesData, isLoadCurrenciesSuccess } = useCurrenciesData(isLoadTransactions);
  const { usersData, isLoadUsersSuccess } = useUsersData(isLoadTransactions);
  const { cardsData, isLoadCardsSuccess } = useCardsData(isLoadTransactions);
  const { categoriesData, isLoadCategoriesSuccess } = useCategoriesData(isLoadTransactions);
  const { transactionsData, isLoadTransactionsSuccess } = useTransactionsData(isLoadTransactions);
  const { transactionsAddMutate, isLoadTransactionsPostSuccess, transactionsPostData } = useTransactionAdd();
  const [transactionCard, setTransactionCard] = useState('');
  const [transactionCategory, setTransactionCategory] = useState('');
  const [transactionDate, setTransactionDate] = useState<Dayjs | null>(dayjs(new Date()));
  const transactionMoney = useRef(0);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categoryType, setCategoryType] = useState(0);
  const transactionNotes = useRef('');
  const [activeCategory, setActiveCategory] = useState([]);
  const [notesValue, setNotesValue] = useState('');

  const moneyFrom = useRef(0);
  const moneyTo = useRef(0);

  const { transactionTransferPostData, transactionTransferMutate, isLoadTransactionTransferPostSuccess } =
    useTransactionTransferAdd();
  const [cardFrom, setCardFrom] = useState('');
  const [cardTo, setCardTo] = useState('');

  const categoryOnChange = (e) => {
    setTransactionCategory(e.target.value);
  };

  const cardOnChange = (e) => {
    setTransactionCard(e.target.value);
  };

  const addTransaction = () => {
    console.info('%c  SERGEY transactionDate', 'background: #222; color: #bada55', transactionDate);
    console.info('%c  SERGEY transactionCard', 'background: #222; color: #bada55', transactionCard);
    if (categoryType === 2) {
      transactionTransferMutate({
        requestData: {
          from: {
            date: transactionDate,
            card: cardFrom,
            category: 'transfer',
            money: moneyFrom.current,
            type: 20,
            notes: transactionNotes.current,
          },
          to: {
            date: transactionDate,
            card: cardTo,
            category: 'transfer',
            money: moneyTo.current,
            type: 21,
            notes: transactionNotes.current,
          },
        },
      });
    } else if (categoryType === 1 || categoryType === 0) {
      transactionsAddMutate({
        requestData: {
          date: transactionDate,
          card: transactionCard,
          category: transactionCategory,
          money: transactionMoney.current,
          type: categoryType,
          notes: transactionNotes.current,
        },
      });
    }
  };

  const getCardCurrency = (currencyId) => {
    if (currenciesData && currenciesData.length > 0) {
      const currency = currenciesData.find((c) => c.id === currencyId);

      return currency ? currency.name : '';
    }
  };

  const getCardUser = (userId) => {
    if (usersData && usersData.length > 0) {
      const user = usersData.find((c) => c.id === userId);

      return user ? user.name : '';
    }
  };

  const addCommentToNotes = (comment: string) => {
    notesValue.length > 1
    ? notesValue[notesValue.length-1] !== ' '
      ? setNotesValue(notesValue.concat(` ${comment}`))
      : setNotesValue(notesValue.concat(`${comment}`))
    : setNotesValue(notesValue.concat(`${comment}`))
  };

  useEffect(() => {transactionNotes.current = notesValue}, [notesValue])

  useEffect(() => {
    if (categoriesData && categoriesData.length > 0) {
      setFilteredCategories(categoriesData.filter((c) => c.type === categoryType));
    }
  }, [categoryType, categoriesData]);

  useEffect(() => {
    setIsLoadTransactions(true);
    transactionMoney.current = 0;
    moneyFrom.current = 0;
    moneyTo.current = 0;
    transactionNotes.current = '';
  }, [transactionsPostData, transactionTransferPostData]);

  useEffect(() => {
    if (isLoadTransactionsSuccess) {
      setIsLoadTransactions(false);
    }
  }, [transactionsData]);

  useEffect(() => {
    if(categoriesData && categoriesData.length > 0) {
      setActiveCategory(categoriesData.filter((c:any) => c.id == transactionCategory))
    }
  }, [transactionCategory]);

  return (
    <>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Add new Transaction</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 2 }}>
            {CATEGORY_TYPES.map((c: any, index: number) => (
              <RadioGroup
                key={c.value}
                inline={true}
                value={c.value}
                isDisabled={c.value === cardTo}
                activeItem={categoryType}
                activeItemChange={(value: string) => setCategoryType(parseInt(value))}
                label={c.name}
              />
            ))}
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              {categoryType !== 2 ? (
                <TextField
                  size="small"
                  defaultValue={0}
                  fullWidth
                  type="number"
                  onChange={(e) => (transactionMoney.current = parseFloat(e.target.value))}
                  label="Money spend"
                  variant="outlined"
                />
              ) : (
                ''
              )}

              {categoryType === 2 ? (
                <>
                  <TextField
                    defaultValue={0}
                    size="small"
                    fullWidth
                    type="number"
                    onChange={(e) => (moneyFrom.current = parseFloat(e.target.value))}
                    label="Money from:"
                    variant="outlined"
                  />
                  <TextField
                    sx={{ mt: 2 }}
                    defaultValue={0}
                    size="small"
                    fullWidth
                    type="number"
                    onChange={(e) => (moneyTo.current = parseFloat(e.target.value))}
                    label="Money to:"
                    variant="outlined"
                  />
                </>
              ) : (
                ''
              )}

              {categoryType === 2 ? (
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box sx={{ mt: 2 }}>
                      <Typography>From card:</Typography>
                      {isLoadCardsSuccess
                        ? cardsData.map((c: any) => (
                            <RadioGroup
                              key={c.id}
                              value={c.id}
                              isDisabled={c.id === cardTo}
                              activeItem={cardFrom}
                              activeItemChange={setCardFrom}
                              label={c.name}
                              secondLabel={`${c.money} ${getCardCurrency(c.currency)} ${getCardUser(c.user)}`}
                            />
                          ))
                        : ''}
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    <Box sx={{ mt: 2 }}>
                      <Typography>To card:</Typography>
                      {isLoadCardsSuccess
                        ? cardsData.map((c: any) => (
                            <RadioGroup
                              key={c.id}
                              value={c.id}
                              isDisabled={c.id === cardFrom}
                              activeItem={cardTo}
                              activeItemChange={setCardTo}
                              label={c.name}
                              secondLabel={`${c.money} ${getCardCurrency(c.currency)} ${getCardUser(c.user)}`}
                            />
                          ))
                        : ''}
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                ''
              )}
              <Box sx={{ mt: 2 }}>
                {isLoadCategoriesSuccess
                  ? filteredCategories.map((c: any) => (
                      <RadioGroup
                        key={c.id}
                        inline={true}
                        value={c.id}
                        activeItem={transactionCategory}
                        activeItemChange={setTransactionCategory}
                        label={c.name}
                      />
                    ))
                  : ''}
              </Box>
              <Divider />
              <Box sx={{ mt: 2 }}>
                {activeCategory
                  ? activeCategory.map((c:any) => {
                    if(c.comments.length > 0) {
                      return (
                        <CommentsList
                          type={'buttons'}
                          list={c.comments}
                          actionHandler={(c) => addCommentToNotes(c)}
                        />
                    )}})
                  : ''}
              </Box>
              <Box sx={{ mt: 2 }}>
                {isLoadCardsSuccess && categoryType !== 2
                  ? cardsData.map((c: any) => (
                      <RadioGroup
                        key={c.id}
                        inline={true}
                        value={c.id}
                        activeItem={transactionCard}
                        activeItemChange={setTransactionCard}
                        label={c.name}
                        secondLabel={`${c.money} ${getCardCurrency(c.currency)} ${getCardUser(c.user)}`}
                      />
                    ))
                  : ''}
              </Box>
              <TextField
                sx={{ mt: 2 }}
                defaultValue={''}
                value={notesValue}
                multiline
                rows={4}
                size="small"
                fullWidth
                type="text"
                onChange={(e) => {transactionNotes.current = e.target.value; setNotesValue(e.target.value)}}
                label="Notes:"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <DateCalendar value={transactionDate} onChange={(newValue) => setTransactionDate(newValue)} />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={8}></Grid>
          </Grid>

          <Button sx={{ mt: 2 }} variant="outlined" onClick={addTransaction}>
            Add Transaction
          </Button>
        </AccordionDetails>
      </Accordion>

      <TransactionTable
        transactions={transactionsData}
        categories={categoriesData}
        cards={cardsData}
        users={usersData}
        currencies={currenciesData}
      />
    </>
  );
};
