import { FC } from 'react';
import { ICONS_MAP } from '../utils';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconMap } from '../interfaces';

type IconsDropdownProps = {
  activeIcon: string;
  onIconChange: (selectedIcon: string) => void;
};

export const IconsDropdown: FC<IconsDropdownProps> = ({ activeIcon, onIconChange }) => {
  const iconChange = (event) => {
    if (typeof onIconChange === 'function') {
      onIconChange(event.target.value);
    }
  };

  return (
    <>
      <Select
        sx={{ minWidth: '270px', width: '100%', height: '40px' }}
        labelId="icon-select"
        id="icon-select"
        value={activeIcon ?? 'undefined'}
        label="Icon *"
        onChange={iconChange}
        variant={'outlined'}>
        {ICONS_MAP.map((icon: IconMap, index: number) => (
          <MenuItem key={index} value={icon.value}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              {icon.component}
              <Typography sx={{ ml: 2 }}>{icon.name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
