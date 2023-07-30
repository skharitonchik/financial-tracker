import { FC, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTransactionsData, useCategoriesData, useCardsData, useCurrenciesData, useUsersData } from '../hooks';
import { RadioGroup } from './RadioGroup';

import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Converter } from './Converter';

ChartJS.register(ArcElement, Tooltip, Legend);

const DEFAULT_PIE_DATA = {
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

type DashboardProps = {};

export const Dashboard: FC<DashboardProps> = () => {
  const [isLoadDashboardData, setIsLoadDashboardData] = useState(true);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(dayjs(''));
  const [dateTo, setDateTo] = useState<Dayjs | null>(dayjs(''));
  const [filterCurrency, setFilterCurrency] = useState('');
  const [income, setIncome] = useState(0);
  const [outcome, setOutcome] = useState(0);
  const [doughnutData, setDoughnutData] = useState(DEFAULT_PIE_DATA);
  const { currenciesData, isLoadCurrenciesSuccess } = useCurrenciesData(isLoadDashboardData);
  const { usersData, isLoadUsersSuccess } = useUsersData(isLoadDashboardData);
  const { cardsData, isLoadCardsSuccess } = useCardsData(isLoadDashboardData);
  const { categoriesData, isLoadCategoriesSuccess } = useCategoriesData(isLoadDashboardData);
  const { transactionsData, isLoadTransactionsSuccess } = useTransactionsData(isLoadDashboardData);

  const prepareChartData = () => {
    const chartData = {};
    let allIncome = 0;
    let allOutcome = 0;

    transactionsData.forEach(
      (t: { id: string; date: string; card: string; category: string; money: number; type: number; notes: string }) => {
        const { category, money, type, card, date } = t;
        const transactionCurrency = getTransactionCurrency(card);

        const transactionDate = dayjs(date).format('YYYY-MM-DD');

        if (dayjs(transactionDate).isBefore(dayjs(dateFrom)) || dayjs(transactionDate).isAfter(dayjs(dateTo))) {
          return;
        }

        if (transactionCurrency && transactionCurrency.id !== filterCurrency) {
          return;
        }

        if (type === 1) {
          allIncome += money;
        }

        if (chartData.hasOwnProperty(category) && type === 0) {
          chartData[category].fullMoney += money;
          allOutcome += money;

          return;
        }

        if (type === 0) {
          const categoryFind = categoriesData.find((c) => c.id === category);
          const { name, color } = categoryFind;

          chartData[category] = {
            fullMoney: money,
            name,
            color,
          };

          allOutcome += money;
        }
      },
    );

    return { chartData, allIncome, allOutcome };
  };
  const preparePieData = (chartData) => {
    const labels: string[] = [];
    const data: number[] = [];
    const backgroundColor: string[] = [];
    const borderColor: string[] = [];

    for (const chartDataKey in chartData) {
      const { name, fullMoney, color } = chartData[chartDataKey];

      labels.push(name);
      data.push(fullMoney.toFixed(2));
      backgroundColor.push(color);
      borderColor.push(color);
    }

    const activeCurrency = currenciesData.find((c) => c.id === filterCurrency);

    return {
      labels,
      datasets: [
        {
          label: `${activeCurrency.name}`,
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    };
  };
  const getTransactionCurrency = (transactionCard) => {
    const card = cardsData.find((c) => c.id === transactionCard);

    return currenciesData.find((c) => c.id === card.currency);
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