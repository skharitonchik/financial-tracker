import { SyntheticEvent, useState, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { Transactions, Currencies, Cards, Dashboard, Filters, Categories, Users, YearTable } from './pages';


const PAGES_CONFIG = [
  {
    label: 'Dashboard',
    component: <Dashboard />,
  },
  {
    label: 'Transactions',
    component: <Transactions />,
  },
  {
    label: 'Year Table',
    component: <YearTable/>
  },
  {
    label: 'Cards',
    component: <Cards />,
  },
  {
    label: 'Categories',
    component: <Categories />,
  },
  {
    label: 'Users',
    component: <Users />,
  },
  {
    label: 'Currencies',
    component: <Currencies />,
  },
  {
    label: 'Saved Filters',
    component: <Filters />,
  },


];

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function App() {
  const queryClient = new QueryClient();

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              {
                PAGES_CONFIG.map((page, index) =>
                  <Tab key={`tab-${index}`} label={page.label} {...a11yProps(index)} />)
              }
            </Tabs>
          </Box>
          {
            PAGES_CONFIG.map((page, index) =>
              <TabPanel key={`tab-panel-${index}`} value={value} index={index}>
                {page.component}
              </TabPanel>,
            )
          }
        </Box>
      </Container>
    </QueryClientProvider>
  );
}
