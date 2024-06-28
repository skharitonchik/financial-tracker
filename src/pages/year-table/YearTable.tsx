import { FC, useEffect } from 'react';
import { useFilteredByMonthTransactions } from '../../hooks';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

type YearTableProps = {};

export const YearTable: FC<YearTableProps> = () => {

  const {
    filteredByMonthTransactions,
    isFilteredByMonthTransactions,
    filteredByMonthTransactionsMutate,
  } = useFilteredByMonthTransactions();

  useEffect(() => {
    filteredByMonthTransactionsMutate({ requestData: { year: '2024' } });
  }, []);

  return (
    <>
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
                <TableRow >
                  {/*<TableCell sx={{ color: type === 0 ? '#FF4842' : '' || type === 1 ? '#008c7e' : '' }}>*/}
                  {/*  {category}*/}
                  {/*</TableCell>*/}
                  {/*<TableCell sx={{ color: type === 0 ? '#FF4842' : '' || type === 1 ? '#008c7e' : '' }}>*/}
                  {/*  {money}*/}
                  {/*</TableCell>*/}
                  {/*<TableCell>{card.currency}</TableCell>*/}
                  {/*<TableCell>{notes}</TableCell>*/}
                  {/*<TableCell>{card.name}</TableCell>*/}
                  {/*<TableCell>{card.user}</TableCell>*/}
                </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
