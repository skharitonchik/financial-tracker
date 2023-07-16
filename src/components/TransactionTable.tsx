import { FC, useEffect, useState, ChangeEvent } from 'react';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { TransactionSummary } from './TransactionSummary';

type TransactionsProps = {
  transactions: any[];
  categories: any[];
  cards: any[];
  users: any[];
  currencies: any[];
};

export const TransactionTable: FC<TransactionsProps> = ({ transactions, categories, cards, users, currencies }) => {
  const [showTable, setShowTable] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState({});
  const [sortedDates, setSortedDates] = useState<string[]>([]);

  const getCategoryName = (categoryId, transactionType) => {
    if (transactionType === 1 || transactionType === 0) {
      const category = categories.find((c) => c.id === categoryId);

      return category ? category.name : '';
    }

    if (transactionType === 20) {
      return 'Перевод -';
    }
    if (transactionType === 21) {
      return 'Перевод +';
    }
  };

  const getCard = (cardId) => {
    const card = cards.find((c) => c.id === cardId);

    return card ? card : '';
  };

  const getCurrencyName = (currencyId) => {
    const currency = currencies.find((c) => c.id === currencyId);

    return currency ? currency.name : '';
  };
  const getUserName = (userId) => {
    const user = users.find((c) => c.id === userId);

    return user ? user.name : '';
  };

  useEffect(() => {
    if (
      transactions &&
      transactions.length > 0 &&
      categories &&
      categories.length > 0 &&
      cards &&
      cards.length > 0 &&
      users &&
      users.length > 0 &&
      currencies &&
      currencies.length > 0
    ) {
      setShowTable(true);
    }
  }, [transactions, categories, cards, users, currencies]);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const groupByDate = {};

      transactions.forEach((t) => {
        const transactionCard = getCard(t.card);
        const transactionCurrency = getCurrencyName(transactionCard.currency);
        const date = dayjs(t.date).format('YYYY-MM-DD');

        if (!groupByDate.hasOwnProperty(date)) {
          groupByDate[date] = {
            transactions: [t],
            plus: {
              [transactionCard.currency]: {
                money: t.type === 1 ? t.money : 0,
                name: transactionCurrency,
              },
            },
            minus: {
              [transactionCard.currency]: {
                money: t.type === 0 ? t.money : 0,
                name: transactionCurrency,
              },
            },
          };
        } else {
          groupByDate[date].transactions.push(t);
          if (t.type === 1) {
            if (!groupByDate[date].plus[transactionCard.currency]) {
              groupByDate[date].plus[transactionCard.currency] = {
                money: t.money,
                name: transactionCurrency,
              };
            } else {
              groupByDate[date].plus[transactionCard.currency].money += t.money;
            }
          }
          if (t.type === 0) {
            if (!groupByDate[date].minus[transactionCard.currency]) {
              groupByDate[date].minus[transactionCard.currency] = {
                money: t.money,
                name: transactionCurrency,
              };
            } else {
              groupByDate[date].minus[transactionCard.currency].money += t.money;
            }
          }
        }
      });
      console.info('%c  SERGEY groupByDate', 'background: #222; color: #bada55', groupByDate);

      setSortedDates(Object.keys(groupByDate).sort((a, b) => (a > b ? -1 : 1)));
      setFilteredTransactions(groupByDate);
      console.info('%c  SERGEY sortedDates', 'background: #222; color: #bada55', sortedDates);
    }
  }, [transactions]);

  if (!showTable) {
    return <></>;
  }

  return (
    <>
      {sortedDates.map((date, index: number) => {
        return (
          <Box key={`${date}--${index}`} sx={{ mb: 2 }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <TransactionSummary filteredTransactions={filteredTransactions} date={date} />
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 550, mt: 2 }} size="medium" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>Money</TableCell>
                        <TableCell>Currency</TableCell>
                        <TableCell>Comments</TableCell>
                        <TableCell>Card</TableCell>
                        <TableCell>User</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredTransactions[date].transactions.map((c: any) => {
                        const transactionCard = getCard(c.card);

                        return (
                          <TableRow key={c.id}>
                            <TableCell sx={{ color: c.type === 0 ? '#FF4842' : '' || c.type === 1 ? '#008c7e' : '' }}>
                              {getCategoryName(c.category, c.type)}
                            </TableCell>
                            <TableCell sx={{ color: c.type === 0 ? '#FF4842' : '' || c.type === 1 ? '#008c7e' : '' }}>
                              {c.money}
                            </TableCell>
                            <TableCell>{getCurrencyName(transactionCard.currency)}</TableCell>
                            <TableCell>{c.notes}</TableCell>
                            <TableCell>{transactionCard.name}</TableCell>
                            <TableCell>{getUserName(transactionCard.user)}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Box>
        );
      })}
    </>
  );
};
