import { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system/styleFunctionSx';

type RadioGroupProps = {
  value: any;
  activeItem: any;
  activeItemChange: (activeItem: any) => void;
  isDisabled?: boolean;
  label?: string | ReactNode;
  secondLabel?: string;
  inline?: boolean;
};

export const RadioGroup: FC<RadioGroupProps> = ({
  value,
  activeItem,
  activeItemChange,
  secondLabel,
  label,
  isDisabled,
  inline,
}) => {
  return (
    <Box sx={{ display: inline ? 'inline-flex' : 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'inline-flex',
          border: activeItem === value ? '1px solid rgba(85, 108, 214, 0.5)' : '',
          px: '5px',
          borderRadius: '4px',
        }}>
        <span style={{ paddingTop: '9px', color: isDisabled ? '#919EAB' : 'black' }}>{label}</span>
        <Radio
          disabled={isDisabled}
          checked={activeItem === value}
          onChange={(e) => activeItemChange(e.target.value)}
          value={value}
          name="radio-buttons"
        />
      </Box>
      <Typography sx={{ color: '#919EAB', fontSize: '0.7rem', pl: '5px' }}>{secondLabel}</Typography>
    </Box>
  );
};
