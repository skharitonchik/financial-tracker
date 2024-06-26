import { FC, useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import { useTransactionTransferAdd, useCardsData } from '../../../hooks';
import { RadioGroup } from '../../../components';

type TransactionTransferFormProps = {
  onTransactionTransfer: () => void;
};

export const TransactionTransferForm: FC<TransactionTransferFormProps> = ({ onTransactionTransfer }) => {
  const [isCardsDataLoaded, setIsCardsDataLoaded] = useState(true);
  const { cardsData, isLoadCardsSuccess } = useCardsData(isCardsDataLoaded);
  const [transactionDate, setTransactionDate] = useState<Dayjs | null>(dayjs(new Date()));
  const transactionNotes = useRef<HTMLInputElement>(null);

  const moneyFrom = useRef(0);
  const moneyTo = useRef(0);

  const { transactionTransferPostData, transactionTransferMutate } = useTransactionTransferAdd();

  const [cardFrom, setCardFrom] = useState('');
  const [cardTo, setCardTo] = useState('');

  useEffect(() => {
    moneyFrom.current = 0;
    moneyTo.current = 0;

    if (transactionNotes.current && transactionNotes.current.value) {
      transactionNotes.current.value = '';
    }
    onTransactionTransfer();
    setIsCardsDataLoaded(true);
  }, [transactionTransferPostData]);

  useEffect(() => {
    setIsCardsDataLoaded(false);
  }, [cardsData]);

  const addTransaction = () => {
    transactionTransferMutate({
      requestData: {
        from: {
          date: transactionDate,
          card: cardFrom,
          category: 'transfer',
          money: moneyFrom.current,
          type: 20,
          notes: transactionNotes?.current?.value,
        },
        to: {
          date: transactionDate,
          card: cardTo,
          category: 'transfer',
          money: moneyTo.current,
          type: 21,
          notes: transactionNotes?.current?.value,
        },
      },
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
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
                        secondLabel={`${c.money} ${c.currency} ${c.user}`}
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
                        secondLabel={`${c.money} ${c.currency} ${c.user}`}
                      />
                    ))
                  : ''}
              </Box>
            </Grid>
          </Grid>
          <Divider />
          <TextField
            sx={{ mt: 2 }}
            defaultValue={''}
            inputRef={transactionNotes}
            multiline
            rows={4}
            size="small"
            fullWidth
            type="text"
            label="Notes:"
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
