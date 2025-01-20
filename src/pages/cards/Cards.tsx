import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';

import { useCardAdd, useCardsData, useCurrenciesData, useUsersData } from '../../hooks';
import { RadioGroup } from '../../components';

import { CardInfo } from './components';

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
      <Box sx={{ mt: 2 }}>
        Show archived:

        {/*checked={checked}*/}
        {/*onChange={handleChange}*/}
        <Switch />
      </Box>
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {isLoadCardsSuccess ? (
          cardsData.map((c: any, index: number) => (
            <CardInfo key={index} cardName={c.name} money={c.money} currency={c.currency} user={c.user} />
          ))
        ) : (
          <div></div>
        )}
      </Box>
    </>
  );
};
