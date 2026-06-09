import {
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent,
    Stack, TextField, Typography
} from '@mui/material';
import { useEffect, useState, type ChangeEvent } from 'react';
import type { BookFormData } from '../../../../api/types/book';
import useAuthors from '../../../../hooks/useAuthors.ts';

const initialFormData = {
    name: '',
    category: '',
    authorId: '',
    state: 'GOOD',
    availableCopies: '1'
};

type BookDialogFormState = typeof initialFormData;

interface AddBookDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: BookFormData) => Promise<void>;
}

const categories = ['NOVEL', 'THRILLER', 'HISTORY', 'FANTASY', 'BIOGRAPHY', 'CLASSICS', 'DRAMA'] as const;
const states = ['GOOD', 'BAD'] as const;

const AddBookDialog = ({ open, onClose, onAdd }: AddBookDialogProps) => {
    const { authors } = useAuthors();
    const [formData, setFormData] = useState<BookDialogFormState>(initialFormData);

    useEffect(() => {
        if (!open) {
            setFormData(initialFormData);
        }
    }, [open]);

    const handleChange = (
        event: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const payload: BookFormData = {
            name: formData.name.trim(),
            category: formData.category,
            authorId: Number(formData.authorId),
            state: formData.state,
            availableCopies: Number(formData.availableCopies)
        };

        await onAdd(payload);
        setFormData(initialFormData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Add Book</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ pt: 1 }}>
                    <TextField
                        label='Name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select label='Category' name='category' value={formData.category} onChange={handleChange} required>
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Author</InputLabel>
                        <Select label='Author' name='authorId' value={formData.authorId} onChange={handleChange} required>
                            {authors.map((author) => (
                                <MenuItem key={author.id} value={author.id.toString()}>
                                    {author.name} {author.surname}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>State</InputLabel>
                        <Select label='State' name='state' value={formData.state} onChange={handleChange} required>
                            {states.map((state) => (
                                <MenuItem key={state} value={state}>{state}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label='Available Copies'
                        name='availableCopies'
                        type='number'
                        slotProps={{ htmlInput: { min: 0 } }}
                        value={formData.availableCopies}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    {authors.length === 0 && (
                        <Typography variant='body2' color='text.secondary'>
                            No authors available. Add authors first before creating books.
                        </Typography>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    variant='contained'
                    color='primary'
                    disabled={!formData.name.trim() || !formData.category || !formData.authorId || !formData.state}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBookDialog;
