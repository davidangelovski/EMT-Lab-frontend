import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useEffect, useState, type ChangeEvent } from 'react';
import type { AuthorFormData } from '../../../../api/types/author';
import useCountries from '../../../../hooks/useCountries.ts';
import type { SelectChangeEvent } from '@mui/material';

interface AddAuthorDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: AuthorFormData) => Promise<void>;
}

const initialFormData = {
    name: '',
    surname: '',
    countryId: ''
};

type AuthorDialogFormState = typeof initialFormData;

const AddAuthorDialog = ({ open, onClose, onAdd }: AddAuthorDialogProps) => {
    const { countries } = useCountries();
    const [formData, setFormData] = useState<AuthorDialogFormState>(initialFormData);

    useEffect(() => {
        if (!open) {
            setFormData(initialFormData);
        }
    }, [open]);

    const handleChange = (event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        await onAdd({
            name: formData.name.trim(),
            surname: formData.surname.trim(),
            countryId: Number(formData.countryId)
        });
        setFormData(initialFormData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Add Author</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ pt: 1 }}>
                    <TextField label='Name' name='name' value={formData.name} onChange={handleChange} required fullWidth />
                    <TextField label='Surname' name='surname' value={formData.surname} onChange={handleChange} required fullWidth />
                    <FormControl fullWidth>
                        <InputLabel>Country</InputLabel>
                        <Select label='Country' name='countryId' value={formData.countryId} onChange={handleChange} required>
                            {countries.map((country) => (
                                <MenuItem key={country.id} value={country.id.toString()}>
                                    {country.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant='contained'
                    onClick={handleSubmit}
                    disabled={!formData.name.trim() || !formData.surname.trim() || !formData.countryId}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAuthorDialog;

