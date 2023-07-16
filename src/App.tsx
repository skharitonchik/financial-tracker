import { SyntheticEvent, useState, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { Currencies, Users, Categories, Cards, Transactions, Dashboard } from './components';

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
              <Tab label="Dashboard" {...a11yProps(0)} />
              <Tab label="Transactions" {...a11yProps(0)} />
              <Tab label="Cards" {...a11yProps(1)} />
              <Tab label="Categories" {...a11yProps(2)} />
              <Tab label="Users" {...a11yProps(3)} />
              <Tab label="Currencies" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Dashboard />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Transactions />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Cards />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Categories />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Users />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Currencies />
          </TabPanel>
        </Box>
      </Container>
    </QueryClientProvider>
  );
}
