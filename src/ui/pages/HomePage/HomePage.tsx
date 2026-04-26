import { Box, Container, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Box sx={{ m: 0, p: 0 }}>
      <Container maxWidth='xl' sx={{ mt: 3, py: 3 }}>
        <Typography variant='h4' gutterBottom>
          Welcome to the EMT Lab Library App! 👋
        </Typography>
        <Typography variant='body1' sx={{ mb: 4 }}>
          Use the navigation above to browse books, authors, and countries.
        </Typography>
      </Container>
    </Box>

  );
};

export default HomePage;