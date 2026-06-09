import { Grid } from '@mui/material';
import type { Country } from '../../../../api/types/country';
import CountryCard from '../CountryCard/CountryCard';

interface CountryGridProps {
    countries: Country[];
    canManage?: boolean;
    onEdit?: (country: Country) => void;
    onDelete?: (country: Country) => void;
}

const CountryGrid = ({ countries, canManage = false, onEdit, onDelete }: CountryGridProps) => {
    return (
        <Grid container spacing={3}>
            {countries.map((country) => (
                <Grid key={country.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <CountryCard country={country} canManage={canManage} onEdit={onEdit} onDelete={onDelete} />
                </Grid>
            ))}
        </Grid>
    );
};

export default CountryGrid;

