import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router';

const HomePage = () => {
  return (
    <Stack spacing={3}>
      <Card elevation={2} sx={{ borderRadius: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant='overline' color='primary'>
            EMT Lab library
          </Typography>
          <Typography variant='h3' gutterBottom sx={{ fontWeight: 700 }}>
            Browse, manage, and organize your library catalog.
          </Typography>
          <Typography variant='body1' color='text.secondary' sx={{ maxWidth: 780 }}>
            Explore books, authors, and countries. When you sign in with an admin account,
            you can create, edit, and delete books right from the catalog pages.
          </Typography>
        </CardContent>
        <CardActions sx={{ px: 4, pb: 4, gap: 1, flexWrap: 'wrap' }}>
          <Button component={Link} to='/books' variant='contained'>Open books</Button>
          <Button component={Link} to='/authors' variant='outlined'>View authors</Button>
          <Button component={Link} to='/countries' variant='outlined'>View countries</Button>
        </CardActions>
      </Card>

      <Grid container spacing={3}>
        {[
          { title: 'Books', description: 'View details and manage the available catalog.' },
          { title: 'Authors', description: 'Browse the current author list and their countries.' },
          { title: 'Countries', description: 'Inspect the countries represented in the library.' }
        ].map((item) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', borderRadius: 4 }}>
              <CardContent>
                <Typography variant='h6' gutterBottom>{item.title}</Typography>
                <Typography variant='body2' color='text.secondary'>{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default HomePage;