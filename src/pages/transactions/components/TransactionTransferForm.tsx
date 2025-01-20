import { FC, useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import { useTransactionTransferAdd, useCardsData } from '../../../hooks';
import { CardsDropdown } from './CardsDropdown';

type TransactionTransferFormProps = {
  onTransactionTransfer: () => void;
};

export const TransactionTransferForm: FC<TransactionTransferFormProps> = ({ onTransactionTransfer }) => {
  const [isCardsDataLoaded, setIsCardsDataLoaded] = useState(true);
  const [isTransferDisabled, setIsTransferDisabled] = useState(false);
  const [cardFrom, setCardFrom] = useState('');
  const [cardTo, setCardTo] = useState('');
  const [transactionDate, setTransactionDate] = useState<Dayjs | null>(dayjs(new Date()));
  //--------------------------
  const transactionNotes = useRef<HTMLInputElement>(null);
  const moneyFrom = useRef<HTMLInputElement>(null);
  const moneyTo = useRef<HTMLInputElement>(null);
  //--------------------------
  const { transactionTransferPostData, transactionTransferMutate } = useTransactionTransferAdd();
  const { cardsData, isLoadCardsSuccess } = useCardsData(isCardsDataLoaded);


  const checkIsTransactionDisabled = () => {
    const moneyFromNum = parseFloat(moneyFrom.current?.value as string);
    const moneyToNum = parseFloat(moneyTo.current?.value as string);

    setIsTransferDisabled(
        moneyFromNum === 0 ||
        moneyToNum === 0 ||
        isNaN(moneyFromNum) ||
        isNaN(moneyToNum) ||
        cardTo.trim().length === 0 ||
        cardFrom.trim().length === 0
    );
  };

  const addTransaction = () => {
    transactionTransferMutate({
      requestData: {
        from: {
          date: transactionDate,
          card: cardFrom,
          category: 'transfer',
          money: parseFloat(moneyFrom?.current?.value as string),
          type: 20,
          notes: transactionNotes?.current?.value,
        },
        to: {
          date: transactionDate,
          card: cardTo,
          category: 'transfer',
          money: parseFloat(moneyTo?.current?.value as string),
          type: 21,
          notes: transactionNotes?.current?.value,
        },
      },
    });
  };

  useEffect(() => {
    checkIsTransactionDisabled();
  }, [cardFrom, cardTo]);

  useEffect(() => {
    setIsTransferDisabled(true);

    if (moneyFrom.current && moneyFrom.current.value) {
      moneyFrom.current.value = '0';
    }

    if (moneyTo.current && moneyTo.current.value) {
      moneyTo.current.value = '0';
    }

    if (transactionNotes.current && transactionNotes.current.value) {
      transactionNotes.current.value = '';
    }
    onTransactionTransfer();
    setIsCardsDataLoaded(true);
  }, [transactionTransferPostData]);

  useEffect(() => {
    setIsCardsDataLoaded(false);
  }, [cardsData]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            defaultValue={0}
            inputRef={moneyFrom}
            size="small"
            fullWidth
            type="number"
            onChange={checkIsTransactionDisabled}
            label="Money from:"
            variant="outlined"
          />
          <TextField
            sx={{ mt: 2 }}
            defaultValue={0}
            inputRef={moneyTo}
            size="small"
            fullWidth
            type="number"
            onChange={checkIsTransactionDisabled}
            label="Money to:"
            variant="outlined"
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ mt: 2 }}>
                {isLoadCardsSuccess ? (
                  <CardsDropdown
                    label={'From card:'}
                    cards={cardsData}
                    onChange={(selectedCard) => setCardFrom(selectedCard)}
                    activeCard={cardFrom}
                    disabledId={cardTo}
                  />
                ) : (
                  ''
                )}
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ mt: 2 }}>
                {isLoadCardsSuccess ? (
                  <CardsDropdown
                    label={'To card:'}
                    cards={cardsData}
                    onChange={(selectedCard) => setCardTo(selectedCard)}
                    activeCard={cardTo}
                    disabledId={cardFrom}
                  />
                ) : (
                  ''
                )}
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 2 }} />
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

      <Button disabled={isTransferDisabled} sx={{ mt: 2 }} variant="outlined" onClick={addTransaction}>
        Add Transaction
      </Button>
    </>
  );
};
