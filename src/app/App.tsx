import { AppBar, Box, Button, Container, Divider, Toolbar, Typography } from "@mui/material";
import { FC } from 'react';
import CompanyListView from '../view/CompanyListView';
import './App.css';

const App: FC = () => {

  const Layout = (children: JSX.Element) => (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography>E-Stock App</Typography>
          <Divider color="white" orientation="vertical" variant="middle" flexItem sx={{ mx: 2 }} />
          <Button color="inherit" href="/">Companies</Button>
          <Button color="inherit" href="/add-company">Add Company</Button>
        </Toolbar>
      </AppBar>
      <Container>
        {children}
      </Container>
    </>
  )

  return (
    <Box>
      {Layout(<CompanyListView />)}
    </Box>
  );
}

export default App;
