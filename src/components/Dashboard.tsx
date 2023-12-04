import { FC, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dayjs, { Dayjs } from 'dayjs';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

import { useTransactionsData, useCategoriesData, useCardsData, useCurrenciesData, useUsersData } from '../hooks';
import { RadioGroup } from './RadioGroup';
import { FiltersCard } from './dashboard/components/FiltersCard';

ChartJS.register(ArcElement, Tooltip, Legend);

const DEFAULT_PIE_DATA = {
  labels: ['Red'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ['rgb(213,10,50)'],
      borderColor: ['rgb(213,10,50)'],
      borderWidth: 1,
    },
  ],
};

type DashboardProps = {};

export const Dashboard: FC<DashboardProps> = () => {
  const [isLoadDashboardData, setIsLoadDashboardData] = useState(true);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(dayjs(''));
  const [dateTo, setDateTo] = useState<Dayjs | null>(dayjs(''));
  const [filterCurrencyId, setFilterCurrencyId] = useState('');
  const [filterCurrencyName, setFilterCurrencyName] = useState('');
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

        if (transactionCurrency && transactionCurrency.id !== filterCurrencyId) {
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

    const activeCurrency = currenciesData.find((c) => c.id === filterCurrencyId);

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

  useEffect(() => {
    if (
      isLoadCardsSuccess &&
      isLoadUsersSuccess &&
      isLoadCategoriesSuccess &&
      isLoadTransactionsSuccess &&
      isLoadCurrenciesSuccess
    ) {
      setIsLoadDashboardData(false);
    }
  }, [
    isLoadCardsSuccess,
    isLoadUsersSuccess,
    isLoadCategoriesSuccess,
    isLoadTransactionsSuccess,
    isLoadCurrenciesSuccess,
  ]);

  useEffect(() => {
    if (currenciesData) {
      setFilterCurrencyId(currenciesData[0].id);
      setFilterCurrencyName(currenciesData[0].name);
    }
  }, [currenciesData]);

  useEffect(() => {
    if (!isLoadDashboardData) {
      const { chartData, allIncome, allOutcome } = prepareChartData();

      setIncome(allIncome);
      setOutcome(allOutcome);

      setDoughnutData(preparePieData(chartData));
    }
  }, [isLoadDashboardData, filterCurrencyId, dateTo, dateFrom]);

  if (isLoadDashboardData) {
    return <></>;
  }

  return (
    <>
      <FiltersCard onDateFromUpdate={(value) => setDateFrom(value)} onDateToUpdate={(value) => setDateTo(value)} />
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Active Currency: &nbsp;</Typography>
          <Typography sx={{ fontStyle: 'italic' }}> {filterCurrencyName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {isLoadCurrenciesSuccess
            ? currenciesData.map((c: any) => (
                <RadioGroup
                  key={c.id}
                  inline={true}
                  value={c.id}
                  activeItem={filterCurrencyId}
                  activeItemChange={(value) => {
                    setFilterCurrencyId(value);
                    setFilterCurrencyName(c.name);
                  }}
                  label={c.name}
                />
              ))
            : ''}
        </AccordionDetails>
      </Accordion>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography sx={{ color: '#008c7e', display: 'inline-flex' }}>
                Total income: {income.toFixed(2)} {currenciesData.find((c) => c.id === filterCurrencyId).name}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography sx={{ color: '#FF4842', display: 'inline-flex' }}>
                Total outcome: {outcome.toFixed(2)} {currenciesData.find((c) => c.id === filterCurrencyId).name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card sx={{ width: '100%', height: 700, mt: 2 }}>
            <CardContent sx={{ ml: 5 }}>
              <Doughnut
                data={doughnutData}
                options={{
                  plugins: {
                    legend: {
                      position: 'bottom',
                      display: true,
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </>
  );
};
