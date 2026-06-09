import { Alert, Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import useCountries from '../../../hooks/useCountries';
import CountryGrid from '../../components/country/CountryGrid/CountryGrid';
import type { Country } from '../../../api/types/country';
import { useAuth } from '../../../context/AuthContext';
import AddCountryDialog from '../../components/country/AddCountryDialog/AddCountryDialog';
import EditCountryDialog from '../../components/country/EditCountryDialog/EditCountryDialog';
import DeleteCountryDialog from '../../components/country/DeleteCountryDialog/DeleteCountryDialog';

const CountriesPage = () => {
    const { countries, loading, error, onAdd, onEdit, onDelete } = useCountries();
    const { isAdmin } = useAuth();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingCountry, setEditingCountry] = useState<Country | null>(null);
    const [deletingCountry, setDeletingCountry] = useState<Country | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);

    const handleAdd = async (payload: Parameters<typeof onAdd>[0]) => {
        setActionError(null);
        try {
            await onAdd(payload);
        } catch (err) {
            setActionError(err instanceof Error ? err.message : 'Unable to add country.');
            throw err;
        }
    };

    const handleEdit = async (id: number, payload: Parameters<typeof onEdit>[1]) => {
        setActionError(null);
        try {
            await onEdit(id, payload);
        } catch (err) {
            setActionError(err instanceof Error ? err.message : 'Unable to update country.');
            throw err;
        }
    };

    const handleDelete = async (id: number) => {
        setActionError(null);
        try {
            await onDelete(id);
        } catch (err) {
            setActionError(err instanceof Error ? err.message : 'Unable to delete country.');
            throw err;
        }
    };

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
        <Stack spacing={3}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { sm: 'center' }, justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant='h4' gutterBottom sx={{ mb: 0.5 }}>
                            Countries
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            {countries.length} {countries.length === 1 ? 'country' : 'countries'} in the system
                        </Typography>
                    </Box>
                    {isAdmin && <Button variant='contained' onClick={() => setIsAddOpen(true)}>Add country</Button>}
                </Box>
            </Paper>

            {actionError && <Alert severity='error' onClose={() => setActionError(null)}>{actionError}</Alert>}

            {countries.length === 0 ? (
                <Alert severity='info'>No countries found.</Alert>
            ) : (
                <CountryGrid
                    countries={countries}
                    canManage={isAdmin}
                    onEdit={(country) => setEditingCountry(country)}
                    onDelete={(country) => setDeletingCountry(country)}
                />
            )}

            <AddCountryDialog open={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={handleAdd} />

            {editingCountry && (
                <EditCountryDialog
                    country={editingCountry}
                    open={true}
                    onClose={() => setEditingCountry(null)}
                    onEdit={handleEdit}
                />
            )}

            {deletingCountry && (
                <DeleteCountryDialog
                    country={deletingCountry}
                    open={true}
                    onClose={() => setDeletingCountry(null)}
                    onDelete={handleDelete}
                />
            )}
        </Stack>
    );
};

export default CountriesPage;


