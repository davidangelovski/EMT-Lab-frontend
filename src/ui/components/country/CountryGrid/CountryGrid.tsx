import { Grid } from '@mui/material';
import type { Country } from '../../../../api/types/country';
import CountryCard from '../CountryCard/CountryCard';

interface CountryGridProps {
    countries: Country[];
}

const CountryGrid = ({ countries }: CountryGridProps) => {
    return (
        <Grid container spacing={3}>
            {countries.map((country) => (
                <Grid key={country.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <CountryCard country={country} />
                </Grid>
            ))}
        </Grid>
    );
};

export default CountryGrid;

