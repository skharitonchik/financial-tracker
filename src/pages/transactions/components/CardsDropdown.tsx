import { FC } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


type CardsDropdownProps = {
  onChange: (selectedCard: string) => void;
  activeCard: string;
  cards: any[];
  disabledId?: string;
  label?: string;
};

export const CardsDropdown: FC<CardsDropdownProps> = ({ onChange, cards, activeCard, disabledId, label }) => {
  const categoryChange = (event) => {
    if (typeof onChange === 'function') {
      onChange(event.target.value);
    }
  };

  return (
    <>
      <InputLabel id="card-select">{label ?? 'Card *'}</InputLabel>
      <Select
        sx={{ width: '100%', height: '75px' }}
        labelId="card-select"
        id="card-select"
        value={activeCard}
        label="Category *"
        onChange={categoryChange}
        variant={'outlined'}>
        {cards.map((c: any) => (
          <MenuItem disabled={c.id === disabledId} key={c.id} value={c.id}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1">{c.name}</Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'text.secondary',
                  fontSize: 12,
                }}>{`${c.money} ${c.currency} ${c.user}`}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
