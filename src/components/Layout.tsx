import { AppBar, Box, Button, Container, Divider, Toolbar, Typography } from "@mui/material";
import { FC } from "react";

interface LayoutProps {
    children: JSX.Element;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <Box>
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
        </Box>
    )
}

export default Layout;