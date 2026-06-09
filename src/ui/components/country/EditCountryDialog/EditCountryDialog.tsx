import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useEffect, useState, type ChangeEvent } from 'react';
import type { Country, CountryFormData } from '../../../../api/types/country';

interface EditCountryDialogProps {
    country: Country;
    open: boolean;
    onClose: () => void;
    onEdit: (id: number, data: CountryFormData) => Promise<void>;
}

const initialFormData = {
    name: '',
    continent: ''
};

type CountryDialogFormState = typeof initialFormData;

const EditCountryDialog = ({ country, open, onClose, onEdit }: EditCountryDialogProps) => {
    const [formData, setFormData] = useState<CountryDialogFormState>(initialFormData);

    useEffect(() => {
        if (!open) {
            setFormData(initialFormData);
            return;
        }

        setFormData({
            name: country.name,
            continent: country.continent
        });
    }, [country, open]);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        await onEdit(country.id, {
            name: formData.name.trim(),
            continent: formData.continent.trim()
        });
        setFormData(initialFormData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Edit Country</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ pt: 1 }}>
                    <TextField label='Name' name='name' value={formData.name} onChange={handleChange} required fullWidth />
                    <TextField label='Continent' name='continent' value={formData.continent} onChange={handleChange} required fullWidth />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant='contained' onClick={handleSubmit} disabled={!formData.name.trim() || !formData.continent.trim()}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCountryDialog;

