import {FC} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import { RadioGroup } from '../../../components';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';

const SAVED_FILTERS = [
  {
    value: 0,
    name: '7 days',
  },
  {
    value: 1,
    name: '1 month',
  },
  {
    value: 2,
    name: '3 month',
  },
  {
    value: 3,
    name: '6 month',
  },
];

type TransactionsFilterProps = {
  categoriesData: any,
  filteredMinus: any,
  filteredPlus: any,
  usersData: any,
  updateFilters: (config: any) => void
};

export const TransactionsFilter: FC<TransactionsFilterProps> = ({
                                                                        categoriesData,
                                                                        usersData,
                                                                        filteredMinus,
                                                                        filteredPlus,
                                                                        updateFilters,
                                                                      }) => {
  const [savedFilter, setSavedFilter] = useState(0);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(dayjs(''));
  const [dateTo, setDateTo] = useState<Dayjs | null>(dayjs(''));
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const convertSavedFilters = () => {
    const today = new Date();
    const setDates = (daysAgoCount) => {
      const daysAgo = new Date();
      daysAgo.setDate(today.getDate() - daysAgoCount);
      setDateFrom(dayjs(daysAgo));
      setDateTo(dayjs(today));
    };


    switch (savedFilter) {
      case 0:
        setDates(7);
        break;
      case 1:
        setDates(31);
        break;
      case 2:
        setDates(90);
        break;
      case 3:
        setDates(180);
        break;
    }
  };

  useEffect(() => {
    convertSavedFilters();
  }, [savedFilter]);

  useEffect(() => {
    updateFilters({
      selectedUser, selectedCategory, dateTo, dateFrom
    });
  }, [selectedUser, selectedCategory, dateTo, dateFrom]);

  return (
    <>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="filterpanel-content" id="filterpanel-header">
          <Typography sx={{ minWidth: 125 }}>Filter</Typography>
          {
            Object.keys(filteredPlus).map((currencyItem, index) => {
              return <Typography key={`${currencyItem}-${index}`}
                                 sx={{ ml: 3, color: '#008c7e', display: 'inline-flex' }}>
                {filteredPlus[currencyItem].toFixed(2)} {currencyItem}
              </Typography>;
            })
          }
          {
            Object.keys(filteredMinus).map((currencyItem, index) => {
              return <Typography key={`${currencyItem}-${index}`}
                                 sx={{ ml: 3, color: '#FF4842', display: 'inline-flex' }}>
                {filteredMinus[currencyItem].toFixed(2)} {currencyItem}
              </Typography>;
            })
          }
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 2 }}>
            {SAVED_FILTERS.map((c: any) => (
              <RadioGroup
                key={c.value}
                inline={true}
                value={c.value}
                activeItem={savedFilter}
                activeItemChange={(value: string) => setSavedFilter(parseInt(value))}
                label={c.name}
              />
            ))}
          </Box>
          <Box sx={{ mb: 2 }}>
            <DatePicker label="Date from" value={dateFrom}
                        onChange={(newValue: Dayjs | null) => setDateFrom(newValue)} />
            <DatePicker
              sx={{ ml: 2 }}
              label="Date to"
              value={dateTo}
              onChange={(newValue: Dayjs | null) => setDateTo(newValue)}
            />
          </Box>
          <FormControl>
            <InputLabel
              id={'filter-user-select-label'}>
              User
            </InputLabel>
            <Select
              sx={{ minWidth: '120px' }}
              labelId="filter-user-select-label"
              label="User"
              size="small"
              value={selectedUser !== '' ? selectedUser : 'Any'}
              onChange={(e: any) => e.target.value !== 'Any' ? setSelectedUser(e.target.value) : setSelectedUser('')}
            >
              <MenuItem
                key={`filter-user-select-item-empty`}
                value={'Any'}
              >{'Any'}
              </MenuItem>
              {
                usersData.map((u, index) => (
                  <MenuItem
                    key={`filter-user-select-item-${index}`}
                    value={u.name}
                  >{u.name}
                  </MenuItem>
                ))

              }
            </Select>
          </FormControl>

          <FormControl
            sx={{ ml: 2 }}>
            <InputLabel id={'filter-category-select-label'}>
              Category
            </InputLabel>
            <Select
              sx={{ minWidth: '120px' }}
              labelId="filter-category-select-label"
              label="Category"
              size="small"
              value={selectedCategory !== '' ? selectedCategory : 'Any'}
              onChange={(e: any) => e.target.value !== 'Any' ? setSelectedCategory(e.target.value) : setSelectedCategory('')}
            >
              <MenuItem
                key={`filter-user-select-item-empty`}
                value={'Any'}
              >{'Any'}
              </MenuItem>
              {
                categoriesData.map((c, index) => (
                  <MenuItem
                    key={`filter-category-select-item-${index}`}
                    value={c.id}
                  >{c.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
