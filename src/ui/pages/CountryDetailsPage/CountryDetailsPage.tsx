import { Alert, Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router';
import useCountry from '../../../hooks/useCountry';

const CountryDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { country, loading, error } = useCountry(id);

    if (error) {
        return <Alert severity='error'>{error.message}</Alert>;
    }

    if (loading || !country) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
                <Link to='/countries' style={{ textDecoration: 'none', color: 'inherit' }}>
                    Countries
                </Link>
                <Typography color='text.primary'>{country.name}</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Avatar
                            variant='rounded'
                            sx={{ width: '100%', height: 220, bgcolor: 'success.main', fontSize: '3rem' }}
                        >
                            {country.name.charAt(0)}
                        </Avatar>
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }}>
                        <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                            {country.name}
                        </Typography>
                        <Typography variant='h5' sx={{ mb: 2 }}>
                            {country.continent}
                        </Typography>
                        <Stack direction='row' spacing={1} useFlexGap sx={{ mb: 3, flexWrap: 'wrap' }}>
                            <Chip label={`Continent: ${country.continent}`} color='primary' variant='outlined' />
                        </Stack>
                        <Typography variant='body2' color='text.secondary'>
                            Country ID: {country.id}
                        </Typography>
                    </Grid>

                    <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant='outlined' startIcon={<ArrowBack />} onClick={() => navigate('/countries')}>
                            Back to Countries
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default CountryDetailsPage;



