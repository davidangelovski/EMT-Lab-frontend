import type { AuthLog } from '../../../../api/types/auth.ts';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface DeleteAuthLogDialogProps {
    AuthLog: AuthLog;
    open: boolean;
    onClose: () => void;
    onDelete: (id: number) => Promise<void>;
}

const DeleteAuthLogDialog = ({ AuthLog, open, onClose, onDelete }: DeleteAuthLogDialogProps) => {
    const handleSubmit = async () => {
        await onDelete(AuthLog.id);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete AuthLog</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete <strong>{AuthLog.username}</strong>? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} color='error' variant='contained'>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAuthLogDialog;
