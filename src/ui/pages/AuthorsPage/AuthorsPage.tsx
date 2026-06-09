import { Alert, Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import useAuthors from '../../../hooks/useAuthors';
import AuthorGrid from '../../components/author/AuthorGrid/AuthorGrid';
import type { Author } from '../../../api/types/author';
import { useAuth } from '../../../context/AuthContext';
import AddAuthorDialog from '../../components/author/AddAuthorDialog/AddAuthorDialog';
import EditAuthorDialog from '../../components/author/EditAuthorDialog/EditAuthorDialog';
import DeleteAuthorDialog from '../../components/author/DeleteAuthorDialog/DeleteAuthorDialog';

const AuthorsPage = () => {
    const { authors, loading, error, onAdd, onEdit, onDelete } = useAuthors();
    const { isAdmin } = useAuth();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
    const [deletingAuthor, setDeletingAuthor] = useState<Author | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);

    const handleAdd = async (payload: Parameters<typeof onAdd>[0]) => {
        setActionError(null);
        try {
            await onAdd(payload);
        } catch (err) {
            setActionError(err instanceof Error ? err.message : 'Unable to add author.');
            throw err;
        }
    };

    const handleEdit = async (id: number, payload: Parameters<typeof onEdit>[1]) => {
        setActionError(null);
        try {
            await onEdit(id, payload);
        } catch (err) {
            setActionError(err instanceof Error ? err.message : 'Unable to update author.');
            throw err;
        }
    };

    const handleDelete = async (id: number) => {
        setActionError(null);
        try {
            await onDelete(id);
        } catch (err) {
            setActionError(err instanceof Error ? err.message : 'Unable to delete author.');
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
                            Authors
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            {authors.length} author{authors.length === 1 ? '' : 's'} in the system
                        </Typography>
                    </Box>
                    {isAdmin && <Button variant='contained' onClick={() => setIsAddOpen(true)}>Add author</Button>}
                </Box>
            </Paper>

            {actionError && <Alert severity='error' onClose={() => setActionError(null)}>{actionError}</Alert>}

            {authors.length === 0 ? (
                <Alert severity='info'>No authors found.</Alert>
            ) : (
                <AuthorGrid
                    authors={authors}
                    canManage={isAdmin}
                    onEdit={(author) => setEditingAuthor(author)}
                    onDelete={(author) => setDeletingAuthor(author)}
                />
            )}

            <AddAuthorDialog open={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={handleAdd} />

            {editingAuthor && (
                <EditAuthorDialog
                    author={editingAuthor}
                    open={true}
                    onClose={() => setEditingAuthor(null)}
                    onEdit={handleEdit}
                />
            )}

            {deletingAuthor && (
                <DeleteAuthorDialog
                    author={deletingAuthor}
                    open={true}
                    onClose={() => setDeletingAuthor(null)}
                    onDelete={handleDelete}
                />
            )}
        </Stack>
    );
};

export default AuthorsPage;


