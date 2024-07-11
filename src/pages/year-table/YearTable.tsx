import { FC, useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { useFilteredByMonthTransactions, useCategoriesSettingsData } from '../../hooks';
import { RadioGroup } from '../../components';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const YEARS_CONFIG = ['2023', '2024'];
const YEAR = '2024';

type YearTableProps = {};

export const YearTable: FC<YearTableProps> = () => {
  const [currentYear, setCurrentYear] = useState(YEAR);
  const [yearData, setYearData] = useState({});
  const [monthKeys, setMonthKeys] = useState<string[]>([]);
  const [totals, setTotals] = useState({});


  const {
    filteredByMonthTransactionsData,
    isFilteredByMonthTransactionsSuccess,
    filteredByMonthTransactionsMutate,
  } = useFilteredByMonthTransactions();

  const { categoriesSettingsData, isCategoriesSettingsDataSuccess } = useCategoriesSettingsData();

  useEffect(() => {
    if (isCategoriesSettingsDataSuccess) {
      console.info('%c  SERGEY categoriesSettingsData', 'background: #222; color: #bada55', categoriesSettingsData);
    }
  }, [categoriesSettingsData]);

  useEffect(() => {
    if (isFilteredByMonthTransactionsSuccess) {
      setYearData(filteredByMonthTransactionsData[currentYear]);

      const monthKeysArr: string[] = [];

      for (const filteredByMonthTransactionsDataKey in filteredByMonthTransactionsData[currentYear]) {
        monthKeysArr.push(filteredByMonthTransactionsDataKey);
      }

      monthKeysArr.sort((a, b) => a < b ? -1 : 1);
      setMonthKeys(monthKeysArr);

      console.info('%c  SERGEY filteredByMonthTransactionsData[currentYear]', 'background: #222; color: #bada55', filteredByMonthTransactionsData[currentYear]);

      const totals = {};

      Object.keys(filteredByMonthTransactionsData[currentYear]).map((monthNumber) => {
        const month = filteredByMonthTransactionsData[currentYear][monthNumber];

        totals[monthNumber] = { income: 0, expense: 0 };

        Object.keys(month).map((categoryKey) => {
          const category = month[categoryKey];

          if (!totals[categoryKey]) {
            totals[categoryKey] = { income: 0, expense: 0 };
          }

          if (category.currencies && category.currencies['PLN']) {
            totals[categoryKey].income += category.currencies['PLN'].income;
            totals[categoryKey].expense += category.currencies['PLN'].expense;

            totals[monthNumber].income += category.currencies['PLN'].income;
            totals[monthNumber].expense += category.currencies['PLN'].expense;
          }
        });
      });

      console.info('%c  SERGEY totals', 'background: #222; color: #bada55', totals);

      setTotals(totals);
    }
  }, [filteredByMonthTransactionsData, currentYear]);

  useEffect(() => {
    filteredByMonthTransactionsMutate({ requestData: { year: '2024' } });
  }, []);


  useEffect(() => {

    console.group('yearsData');

    console.info('%c  SERGEY yearData', 'background: #222; color: #bada55', yearData);
    console.info('%c  SERGEY Object.keys(yearData)', 'background: #222; color: #bada55', Object.keys(yearData));
    console.groupEnd();
  }, [yearData]);

  return (
    <>
      {YEARS_CONFIG.map((year, index) => (
        <RadioGroup
          key={index}
          inline={true}
          value={year}
          activeItem={currentYear}
          activeItemChange={setCurrentYear}
          label={year}
        />
      ))}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550, mt: 2 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{borderRight: '1px solid rgb(224, 224, 224)'}}>Category</TableCell>
              {
                isFilteredByMonthTransactionsSuccess ?
                  monthKeys.map((monthNumber, index) => {
                    return <TableCell key={index} sx={{borderRight: '1px solid rgb(224, 224, 224)'}}>{monthNumber}</TableCell>;
                  }) : ''
              }
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              isCategoriesSettingsDataSuccess ? categoriesSettingsData.map((c, index) => {
                return <TableRow key={`table-row-${index}`} sx={{backgroundColor: index % 2 === 0 ? 'rgb(245 244 244)' : ''}}>

                  <TableCell sx={{ color: c.type === 1 ? '#008c7e' : '#FF4842', borderRight: '1px solid rgb(224, 224, 224)' }}>{c.name}</TableCell>
                  {
                    isFilteredByMonthTransactionsSuccess ?
                      monthKeys.map((monthNumber, index) => {
                        if (yearData[monthNumber][c.name] && yearData[monthNumber][c.name].currencies['PLN']) {
                          const currency = yearData[monthNumber][c.name].currencies['PLN'];

                          switch (c.type) {
                            case 1:
                              return <TableCell sx={{borderRight: '1px solid rgb(224, 224, 224)'}} key={index}>{currency.income.toFixed(2)}</TableCell>;
                            case 0:
                              return <TableCell sx={{borderRight: '1px solid rgb(224, 224, 224)'}} key={index}>{currency.expense.toFixed(2)}</TableCell>;
                            default:
                              return <TableCell sx={{borderRight: '1px solid rgb(224, 224, 224)'}} key={index}></TableCell>;
                          }
                        }

                        return <StyledTableCell sx={{borderRight: '1px solid rgb(224, 224, 224)'}} key={index}></StyledTableCell>;
                      }) : ''
                  }
                  {
                    totals[c.name] ? <TableCell
                        sx={{ fontWeight: 'bold' }}>{c.type === 1 ? totals[c.name].income.toFixed(2) : totals[c.name].expense.toFixed(2)}</TableCell> :
                      <TableCell></TableCell>
                  }
                </TableRow>;
              }) : ''
            }
            {
              isFilteredByMonthTransactionsSuccess ? <TableRow>
                <TableCell sx={{borderRight: '1px solid rgb(224, 224, 224)'}}></TableCell>
                {monthKeys.map((monthNumber) => {
                  if (totals[monthNumber]) {
                    return <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid rgb(224, 224, 224)' }}>{totals[monthNumber].expense.toFixed(2)}</TableCell>;
                  }

                  return <TableCell sx={{borderRight: '1px solid rgb(224, 224, 224)'}}></TableCell>;
                })}
              </TableRow> : <TableRow></TableRow>
            }

          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
