import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import type { Author } from '../../../../api/types/author';

interface DeleteAuthorDialogProps {
    author: Author;
    open: boolean;
    onClose: () => void;
    onDelete: (id: number) => Promise<void>;
}

const DeleteAuthorDialog = ({ author, open, onClose, onDelete }: DeleteAuthorDialogProps) => {
    const handleSubmit = async () => {
        await onDelete(author.id);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Author</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete <strong>{author.name} {author.surname}</strong>? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} color='error' variant='contained'>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAuthorDialog;

