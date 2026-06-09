import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useEffect, useState, type ChangeEvent } from 'react';
import type { CountryFormData } from '../../../../api/types/country';

interface AddCountryDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: CountryFormData) => Promise<void>;
}

const initialFormData = {
    name: '',
    continent: ''
};

type CountryDialogFormState = typeof initialFormData;

const AddCountryDialog = ({ open, onClose, onAdd }: AddCountryDialogProps) => {
    const [formData, setFormData] = useState<CountryDialogFormState>(initialFormData);

    useEffect(() => {
        if (!open) {
            setFormData(initialFormData);
        }
    }, [open]);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        await onAdd({
            name: formData.name.trim(),
            continent: formData.continent.trim()
        });
        setFormData(initialFormData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Add Country</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ pt: 1 }}>
                    <TextField label='Name' name='name' value={formData.name} onChange={handleChange} required fullWidth />
                    <TextField label='Continent' name='continent' value={formData.continent} onChange={handleChange} required fullWidth />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant='contained' onClick={handleSubmit} disabled={!formData.name.trim() || !formData.continent.trim()}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddCountryDialog;

