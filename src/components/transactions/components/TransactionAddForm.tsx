import { FC, useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { RadioGroup } from '../../RadioGroup';
import Divider from '@mui/material/Divider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Button from '@mui/material/Button';
import { useCardsData, useCategoriesData, useTransactionAdd, useTransactionsData } from '../../../hooks';
import dayjs, { Dayjs } from 'dayjs';
import { CommentsButtonsList } from '../../CommentsButtonsList';

interface ITransactionCategory {
  id: string;
  name: string;
  type: number;
  color: string;
  comments: string[];
}

type TransactionAddFormProps = {
  onTransactionAdd: () => void;
  categoryType: number;
};

export const TransactionAddForm: FC<TransactionAddFormProps> = ({ onTransactionAdd, categoryType }) => {
  const [isLoadTransactions, setIsLoadTransactions] = useState(true);
  const { cardsData, isLoadCardsSuccess } = useCardsData(isLoadTransactions);
  const { categoriesData, isLoadCategoriesSuccess } = useCategoriesData(isLoadTransactions);
  const { transactionsData, isLoadTransactionsSuccess } = useTransactionsData(isLoadTransactions);
  const { transactionsAddMutate, transactionsPostData } = useTransactionAdd();
  const [transactionCard, setTransactionCard] = useState('');
  const [transactionCategoryID, setTransactionCategoryID] = useState('');
  const [transactionDate, setTransactionDate] = useState<Dayjs | null>(dayjs(new Date()));
  const transactionMoney = useRef<HTMLInputElement>(null);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const transactionNotes = useRef<HTMLInputElement>(document.createElement('input'));
  const [transactionCategory, setTransactionCategory] = useState<ITransactionCategory>({
    id: '',
    name: '',
    type: -1,
    color: '',
    comments: [],
  });

  const addTransaction = () => {
    transactionsAddMutate({
      requestData: {
        date: transactionDate,
        card: transactionCard,
        category: transactionCategoryID,
        money: parseInt(transactionMoney?.current?.value as string),
        type: categoryType,
        notes: transactionNotes?.current?.value,
      },
    });
  };

  const addCommentToNotes = (comment: string) => {
    let t = transactionNotes.current.value;

    t.length > 1
      ? t[t.length - 1] !== ' '
        ? (t = t.concat(` ${comment}`))
        : (t = t.concat(`${comment}`))
      : (t = t.concat(`${comment}`));

    document.getElementById('notes')?.focus();

    return (transactionNotes.current.value = t);
  };

  useEffect(() => {
    setTransactionCategory(filteredCategories.find((i) => i.id === transactionCategoryID));
  }, [transactionCategoryID]);

  useEffect(() => {
    if (categoriesData && categoriesData.length > 0) {
      setFilteredCategories(categoriesData.filter((c) => c.type === categoryType));
    }
  }, [categoryType, categoriesData]);

  useEffect(() => {
    setIsLoadTransactions(true);

    if (transactionMoney.current && transactionMoney.current.value) {
      transactionMoney.current.value = '0';
    }

    if (transactionNotes.current && transactionNotes.current.value) {
      transactionNotes.current.value = '';
    }

    onTransactionAdd();
  }, [transactionsPostData]);

  useEffect(() => {
    if (isLoadTransactionsSuccess) {
      setIsLoadTransactions(false);
    }
  }, [transactionsData]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            size="small"
            defaultValue={0}
            inputRef={transactionMoney}
            fullWidth
            type="number"
            label="Money spend"
            variant="outlined"
          />

          <Box sx={{ mt: 2 }}>
            {isLoadCategoriesSuccess
              ? filteredCategories.map((c: any) => (
                  <RadioGroup
                    key={c.id}
                    inline={true}
                    value={c.id}
                    activeItem={transactionCategoryID}
                    activeItemChange={setTransactionCategoryID}
                    label={c.name}
                  />
                ))
              : ''}
          </Box>
          <Divider />
          <Box sx={{ mt: 2 }}>
            {isLoadCardsSuccess
              ? cardsData.map((c: any) => (
                  <RadioGroup
                    key={c.id}
                    inline={true}
                    value={c.id}
                    activeItem={transactionCard}
                    activeItemChange={setTransactionCard}
                    label={c.name}
                    secondLabel={`${c.money} ${c.currency} ${c.user}`}
                  />
                ))
              : ''}
          </Box>
          <Divider />
          <Box sx={{ mt: 2 }}>
            {transactionCategory && transactionCategory.comments && transactionCategory.comments.length > 0 ? (
              <CommentsButtonsList list={transactionCategory.comments} onClickHandler={(c) => addCommentToNotes(c)} />
            ) : (
              ''
            )}
          </Box>
          <TextField
            sx={{ mt: 2 }}
            defaultValue={' '}
            inputRef={transactionNotes}
            multiline
            rows={4}
            size="small"
            fullWidth
            type="text"
            placeholder="Notes:"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <DateCalendar value={transactionDate} onChange={(newValue) => setTransactionDate(newValue)} />
        </Grid>
      </Grid>

      <Button sx={{ mt: 2 }} variant="outlined" onClick={addTransaction}>
        Add Transaction
      </Button>
    </>
  );
};
