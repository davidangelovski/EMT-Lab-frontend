import { Alert, Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import AddBookDialog from '../../components/book/AddBookDialog/AddBookDialog';
import DeleteBookDialog from '../../components/book/DeleteBookDialog/DeleteProductDialog';
import EditBookDialog from '../../components/book/EditBookDialog/EditBookDialog';
import BookGrid from '../../components/book/BookGrid/BookGrid';
import useBooks from '../../../hooks/useBooks';
import type { Book } from '../../../api/types/book';
import { useAuth } from '../../../context/AuthContext';

const BooksPage = () => {
    const { books, loading, error, onAdd, onEdit, onDelete } = useBooks();
    const { isAdmin } = useAuth();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [deletingBook, setDeletingBook] = useState<Book | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);

    const handleAdd = async (payload: Parameters<typeof onAdd>[0]) => {
        try {
            setActionError(null);
            await onAdd(payload);
        } catch (err) {
            setActionError(err instanceof Error ? err.message : 'Unable to add book.');
            throw err;
        }
    };

    const handleEdit = async (id: number, payload: Parameters<typeof onEdit>[1]) => {
        try {
            setActionError(null);
            await onEdit(id, payload);
        } catch (err) {
            setActionError(err instanceof Error ? err.message : 'Unable to update book.');
            throw err;
        }
    };

    const handleDelete = async (id: number) => {
        try {
            setActionError(null);
            await onDelete(id);
        } catch (err) {
            setActionError(err instanceof Error ? err.message : 'Unable to delete book.');
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { sm: 'center' }, justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant='h4' gutterBottom sx={{ mb: 0.5 }}>
                            Books
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            {books.length} book{books.length === 1 ? '' : 's'} in the catalog
                        </Typography>
                    </Box>
                    {isAdmin && (
                        <Button variant='contained' onClick={() => setIsAddOpen(true)}>
                            Add book
                        </Button>
                    )}
                </Box>
            </Paper>

            {actionError && <Alert severity='error' onClose={() => setActionError(null)}>{actionError}</Alert>}

            {books.length === 0 ? (
                <Alert severity='info'>No books found.</Alert>
            ) : (
                <BookGrid
                    books={books}
                    canManage={isAdmin}
                    onEdit={(book) => setEditingBook(book)}
                    onDelete={(book) => setDeletingBook(book)}
                />
            )}

            <AddBookDialog
                open={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onAdd={handleAdd}
            />

            {editingBook && (
                <EditBookDialog
                    book={editingBook}
                    open={true}
                    onClose={() => setEditingBook(null)}
                    onEdit={handleEdit}
                />
            )}

            {deletingBook && (
                <DeleteBookDialog
                    book={deletingBook}
                    open={true}
                    onClose={() => setDeletingBook(null)}
                    onDelete={handleDelete}
                />
            )}
        </Box>
    );
};

export default BooksPage;


