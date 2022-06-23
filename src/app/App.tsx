import { AppBar, Box, Button, Container, Divider, Toolbar, Typography } from "@mui/material";
import { FC } from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AddCompanyView from "../view/AddCompanyView";
import CompanyListView from '../view/CompanyListView';
import CompanyView from "../view/CompanyView";
import './App.css';

const App: FC = () => {

  const Layout = (children: JSX.Element) => (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography>E-Stock App</Typography>
          <Divider color="white" orientation="vertical" variant="middle" flexItem sx={{ mx: 2 }} />
          <Button color="inherit" component={Link} to="/">Companies</Button>
          <Button color="inherit" component={Link} to="/add-company">Add Company</Button>
        </Toolbar>
      </AppBar>
      <Container>
        {children}
      </Container>
    </>
  )

  return (
    <Box>
      <BrowserRouter>
        {Layout(
          <Routes>
            <Route path="/" element={<CompanyListView />} />
            <Route path="/company/:id" element={<CompanyView />} />
            <Route path="/add-company" element={<AddCompanyView />} />
          </Routes>
        )}
      </BrowserRouter>

    </Box>
  );
}

export default App;
