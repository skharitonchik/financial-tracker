import { FC, useEffect, useState } from 'react';
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
import { getColorByType } from '../../../utils';

interface ITransaction {
  id: string;
  type: number;
  card: {
    currency: string;
    user: string;
    name: string;
  };
  category: string;

  money: number;
  notes: string;
}

type TransactionsProps = {
  transactions: {
    [key: string]: {
      minus: {
        [key: string]: number;
      };
      plus: {
        [key: string]: number;
      };
      transactions: ITransaction[];
    };
  };
};

export const TransactionTable: FC<TransactionsProps> = ({ transactions }) => {
  const [showTable, setShowTable] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState({});
  const [sortedDates, setSortedDates] = useState<string[]>([]);

  useEffect(() => {
    setShowTable(transactions && Object.keys(transactions).length > 0);
  }, [transactions]);

  useEffect(() => {
    if (transactions && Object.keys(transactions).length > 0) {
      setSortedDates(Object.keys(transactions).sort((a, b) => (a > b ? -1 : 1)));
      setFilteredTransactions(transactions);
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
                      {filteredTransactions[date].transactions.map((transaction) => {
                        const { card, id, category, notes, type, money } = transaction;

                        return (
                          <TableRow key={id}>
                            <TableCell sx={{ color: getColorByType(type) }}>
                              {category}
                            </TableCell>
                            <TableCell sx={{ color: getColorByType(type) }}>
                              {money}
                            </TableCell>
                            <TableCell>{card.currency}</TableCell>
                            <TableCell>{notes}</TableCell>
                            <TableCell>{card.name}</TableCell>
                            <TableCell>{card.user}</TableCell>
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
