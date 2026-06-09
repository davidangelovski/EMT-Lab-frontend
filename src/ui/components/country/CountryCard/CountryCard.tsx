import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router';
import type { Country } from '../../../../api/types/country';

interface CountryCardProps {
    country: Country;
    canManage?: boolean;
    onEdit?: (country: Country) => void;
    onDelete?: (country: Country) => void;
}

const CountryCard = ({ country, canManage = false, onEdit, onDelete }: CountryCardProps) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4 }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='h6' gutterBottom>
                    {country.name}
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                    Continent: {country.continent}
                </Typography>
                <Stack direction='row' spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                    <Chip label={country.continent} size='small' color='primary' variant='outlined' />
                </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                <Button component={Link} to={`/countries/${country.id}`} startIcon={<InfoIcon />}>
                    Details
                </Button>
                {canManage && (
                    <Stack direction='row' spacing={1} sx={{ ml: 'auto' }}>
                        <Button onClick={() => onEdit?.(country)} startIcon={<EditIcon />} size='small'>
                            Edit
                        </Button>
                        <Button onClick={() => onDelete?.(country)} startIcon={<DeleteIcon />} color='error' size='small'>
                            Delete
                        </Button>
                    </Stack>
                )}
            </CardActions>
        </Card>
    );
};

export default CountryCard;


