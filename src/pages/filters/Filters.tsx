import { FC, useEffect, useCallback, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FilterForm } from './FilterForm';
import { useFilterData } from '../../hooks';

type FiltersProps = {};

export const Filters: FC<FiltersProps> = () => {
  const [isLoadFilters, setIsLoadFilters] = useState(true);
  const { filtersData } = useFilterData(isLoadFilters);
  const updateAction = useCallback(() => setIsLoadFilters(true), []);

  useEffect(() => {
    setIsLoadFilters(false);
  }, [filtersData]);
  return (
    <>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Add new Saved Filter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FilterForm updateAction={updateAction} />
        </AccordionDetails>
      </Accordion>

      {filtersData
        ? filtersData.map((filter) => {
            return (
              <Accordion key={`filter-${filter.id}`} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography>{filter.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FilterForm savedFilter={filter} updateAction={updateAction} />
                </AccordionDetails>
              </Accordion>
            );
          })
        : ''}
    </>
  );
};
