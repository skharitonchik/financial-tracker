import { FC, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useCurrenciesData, useCurrencyAdd } from '../../hooks';

type CurrenciesProps = {};

export const Currencies: FC<CurrenciesProps> = () => {
  const [isLoadCurrencies, setIsLoadCurrencies] = useState(true);
  const { currenciesData, isLoadCurrenciesSuccess } = useCurrenciesData(isLoadCurrencies);
  const { currencyAddMutate, currencyAddData } = useCurrencyAdd();
  const [newCurrency, setNewCurrency] = useState('');

  const addCurrency = () => {
    currencyAddMutate({
      requestData: {
        name: newCurrency,
      },
    });
  };

  useEffect(() => {
    setIsLoadCurrencies(true);
    setNewCurrency('');
  }, [currencyAddData]);

  useEffect(() => {
    if (isLoadCurrenciesSuccess) {
      setIsLoadCurrencies(false);
    }
  }, [currenciesData]);

  return (
    <>
      <TextField
        value={newCurrency}
        size="small"
        fullWidth
        type="text"
        onChange={(e) => setNewCurrency(e.target.value)}
        label="New currency"
        variant="outlined"
      />

      <Button sx={{ mt: 2 }} variant="outlined" onClick={addCurrency}>
        Add Currency
      </Button>
      <List>
        {isLoadCurrenciesSuccess
          ? currenciesData.map((c: any) => {
              return (
                <ListItem key={c.id} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={c.name} />
                  </ListItemButton>
                </ListItem>
              );
            })
          : ''}
      </List>
    </>
  );
};
