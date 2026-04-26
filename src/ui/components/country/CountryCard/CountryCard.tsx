import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router';
import type { Country } from '../../../../api/types/country';

interface CountryCardProps {
    country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='h6' gutterBottom>
                    {country.name}
                </Typography>
                <Stack direction='row' spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                    <Chip label={country.continent} size='small' color='primary' variant='outlined' />
                </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button component={Link} to={`/countries/${country.id}`} startIcon={<InfoIcon />}>
                    Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default CountryCard;


