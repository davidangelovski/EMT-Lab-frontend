import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import useCountries from '../../../hooks/useCountries';
import CountryGrid from '../../components/country/CountryGrid/CountryGrid';

const CountriesPage = () => {
    const { countries, loading, error } = useCountries();

    if (loading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity='error'>{error.message}</Alert>;
    }

    return (
        <Box>
            <Typography variant='h4' gutterBottom>
                Countries
            </Typography>
            <CountryGrid countries={countries} />
        </Box>
    );
};

export default CountriesPage;


