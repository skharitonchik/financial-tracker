import { FC, useEffect, useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';

import { useCardAdd, useCardsData, useCurrenciesData, useUsersData } from '../hooks';
import { RadioGroup } from './RadioGroup';

type CardsProps = {};

export const Cards: FC<CardsProps> = () => {
  const [isLoadCards, setIsLoadCards] = useState(true);
  const { currenciesData, isLoadCurrenciesSuccess } = useCurrenciesData(isLoadCards);
  const { usersData, isLoadUsersSuccess } = useUsersData(isLoadCards);
  const { cardsData, isLoadCardsSuccess } = useCardsData(isLoadCards && isLoadCurrenciesSuccess);
  const { cardAddMutate, cardsPostData } = useCardAdd();
  const [newCard, setNewCard] = useState('');
  const [startMoney, setStartMoney] = useState(0);
  const [currency, setCurrency] = useState('');
  const [cardUser, setCardUser] = useState('');

  const handleChangeUsers = (event: ChangeEvent<HTMLInputElement>) => {
    setCardUser(event.target.value);
  };

  const handleChangeCurrencies = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  const getCardUser = (userId) => {
    return usersData.find((c) => c.id === userId).name;
  };

  const getCardCurrency = (currencyId) => {
    console.info('%c  SERGEY currenciesData', 'background: #222; color: #bada55', currenciesData);
    console.info('%c  SERGEY currencyId', 'background: #222; color: #bada55', currencyId);
    return currenciesData.find((c) => c.id === currencyId).name;
  };

  const addCard = () => {
    cardAddMutate({
      requestData: {
        name: newCard,
        money: startMoney,
        currency: currency,
        user: cardUser,
      },
    });
  };

  useEffect(() => {
    setIsLoadCards(true);
    setNewCard('');
    setStartMoney(0);
  }, [cardsPostData]);

  useEffect(() => {
    if (isLoadCardsSuccess) {
      setIsLoadCards(false);
      console.info('%c  SERGEY cardsData', 'background: #222; color: #bada55', cardsData);
    }
  }, [cardsData]);

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Add new Card</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            value={newCard}
            size="small"
            fullWidth
            type="text"
            onChange={(e) => setNewCard(e.target.value)}
            label="New card"
            variant="outlined"
          />

          <TextField
            sx={{ mt: 2 }}
            value={startMoney}
            size="small"
            fullWidth
            type="number"
            onChange={(e) => setStartMoney(parseFloat(e.target.value))}
            label="Card money"
            variant="outlined"
          />
          <Box sx={{ mt: 2 }}>
            {isLoadUsersSuccess
              ? usersData.map((c: any) => (
                  <RadioGroup
                    key={c.id}
                    inline={true}
                    value={c.id}
                    activeItem={cardUser}
                    activeItemChange={setCardUser}
                    label={c.name}
                  />
                ))
              : ''}
          </Box>
          <Divider sx={{ mt: 1 }} />
          <Box sx={{ mt: 2 }}>
            {isLoadCurrenciesSuccess
              ? currenciesData.map((c: any) => (
                  <RadioGroup
                    key={c.id}
                    inline={true}
                    value={c.id}
                    activeItem={currency}
                    activeItemChange={setCurrency}
                    label={c.name}
                  />
                ))
              : ''}
          </Box>
          <Button sx={{ mt: 2 }} variant="outlined" onClick={addCard}>
            Add Card
          </Button>
        </AccordionDetails>
      </Accordion>

      <TableContainer>
        <Table sx={{ minWidth: 550, mt: 2 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Card/Account name</TableCell>
              <TableCell>Card Money</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoadCardsSuccess ? (
              cardsData.map((c: any) => {
                return (
                  <TableRow key={c.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.money}</TableCell>
                    <TableCell>{getCardCurrency(c.currency)}</TableCell>
                    <TableCell>{getCardUser(c.user)}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableCell></TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
