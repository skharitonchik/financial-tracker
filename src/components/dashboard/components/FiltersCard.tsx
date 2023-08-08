import { FC, useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { RadioGroup } from '../../RadioGroup';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useFilterData } from '../../../hooks';

type FiltersCardProps = {
  onDateFromUpdate: (dateFrom: Dayjs | null) => void;
  onDateToUpdate: (dateTo: Dayjs | null) => void;
};

export const FiltersCard: FC<FiltersCardProps> = ({ onDateFromUpdate, onDateToUpdate }) => {
  const { filtersData } = useFilterData(true);
  const [activeParentFilterId, setActiveParentIdFilter] = useState<string>();
  const [activeParentFilter, setActiveParentFilter] = useState<{
    childFilters: any[];
  }>();
  const [activeChildFilter, setActiveChildFilter] = useState();
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(dayjs(''));
  const [dateTo, setDateTo] = useState<Dayjs | null>(dayjs(''));

  useEffect(() => onDateFromUpdate(dateFrom), [dateFrom]);
  useEffect(() => onDateToUpdate(dateTo), [dateTo]);
  useEffect(() => {
    if (filtersData) {
      const activeParent = filtersData[filtersData.length - 1];
      const activeChild = activeParent.childFilters[activeParent.childFilters.length - 1];
      if (activeChild) {
        const { dateFrom, dateTo } = activeChild;

        setDateFrom(dayjs(dateFrom));
        setDateTo(dayjs(dateTo));
        setActiveChildFilter(activeChild.id);
      } else {
        setDateFrom(dayjs());
        setDateTo(dayjs());
      }
      setActiveParentIdFilter(activeParent.id);
    }
  }, [filtersData]);
  useEffect(() => {
    if (activeParentFilterId) {
      const activeParent = filtersData.find((f) => f.id === activeParentFilterId);

      setActiveParentFilter(activeParent);
    }
  }, [activeParentFilterId]);

  return (
    <Accordion sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>Saved filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {filtersData
            ? filtersData.map((filter) => {
                return (
                  <RadioGroup
                    key={filter.id}
                    inline={true}
                    value={filter.id}
                    activeItemChange={(value) => setActiveParentIdFilter(value)}
                    activeItem={activeParentFilterId}
                    label={filter.name}
                  />
                );
              })
            : ''}
        </Box>

        {activeParentFilter
          ? activeParentFilter.childFilters.map((child) => {
              return (
                <Box
                  key={child.id}
                  sx={{
                    mt: 1,
                    display: 'inline-flex',
                    flexDirection: 'column',
                  }}>
                  <RadioGroup
                    inline={true}
                    value={child.id}
                    activeItem={activeChildFilter}
                    activeItemChange={(childId) => {
                      const { dateFrom, dateTo } = child;

                      setDateFrom(dayjs(dateFrom));
                      setDateTo(dayjs(dateTo));
                      setActiveChildFilter(childId);
                    }}
                    label={
                      <>
                        {child.name}
                        <Typography
                          sx={{ fontSize: 10, opacity: 0.8, fontStyle: 'italic' }}
                          variant="subtitle2">{`${dayjs(child.dateFrom).format('D MMM')} - ${dayjs(child.dateTo).format(
                          'D MMM',
                        )}`}</Typography>
                      </>
                    }
                  />
                </Box>
              );
            })
          : ''}

        <Divider sx={{ mt: 2 }} />
        <Box sx={{ mt: 2 }}>
          <DatePicker label="Date from" value={dateFrom} onChange={(newValue: Dayjs | null) => setDateFrom(newValue)} />
          <DatePicker
            sx={{ ml: 2 }}
            label="Date to"
            value={dateTo}
            onChange={(newValue: Dayjs | null) => setDateTo(newValue)}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
