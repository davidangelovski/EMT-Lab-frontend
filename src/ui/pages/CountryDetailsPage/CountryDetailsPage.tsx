import { Alert, Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router';
import useCountry from '../../../hooks/useCountry';
import { useState } from 'react';
import type { Country } from '../../../api/types/country';
import { useAuth } from '../../../context/AuthContext';
import EditCountryDialog from '../../components/country/EditCountryDialog/EditCountryDialog';
import DeleteCountryDialog from '../../components/country/DeleteCountryDialog/DeleteCountryDialog';
import useCountries from '../../../hooks/useCountries';

const CountryDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { country, loading, error, fetch } = useCountry(id);
    const { onEdit, onDelete } = useCountries();
    const { isAdmin } = useAuth();
    const [editingCountry, setEditingCountry] = useState<Country | null>(null);
    const [deletingCountry, setDeletingCountry] = useState<Country | null>(null);

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

                        {isAdmin && (
                            <Stack direction='row' spacing={1} sx={{ mt: 3, flexWrap: 'wrap' }}>
                                <Button variant='contained' onClick={() => setEditingCountry(country)}>Edit</Button>
                                <Button variant='outlined' color='error' onClick={() => setDeletingCountry(country)}>Delete</Button>
                            </Stack>
                        )}
                    </Grid>

                    <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant='outlined' startIcon={<ArrowBack />} onClick={() => navigate('/countries')}>
                            Back to Countries
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {editingCountry && (
                <EditCountryDialog
                    country={editingCountry}
                    open={true}
                    onClose={() => setEditingCountry(null)}
                    onEdit={async (countryId, payload) => {
                        await onEdit(countryId, payload);
                        await fetch();
                        setEditingCountry(null);
                    }}
                />
            )}

            {deletingCountry && (
                <DeleteCountryDialog
                    country={deletingCountry}
                    open={true}
                    onClose={() => setDeletingCountry(null)}
                    onDelete={async (countryId) => {
                        await onDelete(countryId);
                        setDeletingCountry(null);
                        navigate('/countries');
                    }}
                />
            )}
        </Box>
    );
};

export default CountryDetailsPage;



