import { FC, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Box from '@mui/material/Box';

import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Converter } from './Converter';

ChartJS.register(ArcElement, Tooltip, Legend);

type DashboardProps = {};

export const Dashboard: FC<DashboardProps> = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgb(213,10,50)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgb(213,10,50)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const [amount, setAmount] = useState(0);
  const [firstCurrency, setFirstCurrency] = useState('BYN');
  const [secondCurrency, setSecondCurrency] = useState('USD');

  return (
    <>
      <Box sx={{ width: 500, height: 500 }}>
        <Doughnut data={data} />
      </Box>

      <Box sx={{ mt: 1, height: 100}}>
        <Box sx={{ mb: 2}}>
          <Typography>Select currencies</Typography>
          <Select
            id='first-currency-selector'
            onChange={(e) => {setFirstCurrency(e.target.value)}}
            value={firstCurrency}
            >
            <MenuItem value={'BYN'}>BYN</MenuItem>
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'EUR'}>EUR</MenuItem>
          </Select>
          <Select 
            id='second-currency-selector'
            onChange={(e) => {setSecondCurrency(e.target.value)}}
            value={secondCurrency}
            >
            <MenuItem value={'BYN'}>BYN</MenuItem>
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'EUR'}>EUR</MenuItem>
          </Select>
        </Box>

        <Box>
          <TextField
            sx={{mr: 1}}
            placeholder='Input you amount'
            label= {firstCurrency}
            onChange={(e) => {setAmount(parseFloat(e.target.value))}}
            type='number'
            value={amount}>
          </TextField>
          
          <Converter
            amount={amount}
            firstCurrency={firstCurrency}
            secondCurrency={secondCurrency}
          />
        </Box>
      </Box>
    </>
  );
};