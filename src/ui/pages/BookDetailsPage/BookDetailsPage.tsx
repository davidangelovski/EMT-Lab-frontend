import { Alert, Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router';
import useBook from '../../../hooks/useBook';
import { useState } from 'react';
import type { Book } from '../../../api/types/book';
import EditBookDialog from '../../components/book/EditBookDialog/EditBookDialog';
import DeleteBookDialog from '../../components/book/DeleteBookDialog/DeleteProductDialog';
import useBooks from '../../../hooks/useBooks';
import { useAuth } from '../../../context/AuthContext';

const BookDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { book, loading, error, fetch } = useBook(id);
    const { onEdit, onDelete } = useBooks();
    const { isAdmin } = useAuth();
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [deletingBook, setDeletingBook] = useState<Book | null>(null);

    if (error) {
        return <Alert severity='error'>{error.message}</Alert>;
    }

    if (loading || !book) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
                <Link to='/books' style={{ textDecoration: 'none', color: 'inherit' }}>
                    Books
                </Link>
                <Typography color='text.primary'>{book.name}</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Avatar
                            variant='rounded'
                            sx={{ width: '100%', height: 220, bgcolor: 'primary.main', fontSize: '3rem' }}
                        >
                            {book.name.charAt(0)}
                        </Avatar>
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }}>
                        <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                            {book.name}
                        </Typography>
                        <Typography variant='h5' color='primary.main' sx={{ mb: 2 }}>
                            {book.authorName} {book.authorSurname}
                        </Typography>
                        <Typography variant='body1' sx={{ mb: 3 }}>
                            A book categorized as <strong>{book.category}</strong> and currently marked as <strong>{book.state}</strong>.
                        </Typography>

                        <Stack direction='row' spacing={1} useFlexGap sx={{ mb: 3, flexWrap: 'wrap' }}>
                            <Chip label={`Category: ${book.category}`} color='primary' variant='outlined' />
                            <Chip label={`State: ${book.state}`} color='secondary' variant='outlined' />
                            <Chip label={`Available copies: ${book.availableCopies}`} variant='outlined' />
                            <Chip label={`Country: ${book.country}`} variant='outlined' />
                        </Stack>

                        <Typography variant='body2' color='text.secondary'>
                            Book ID: {book.id}
                        </Typography>

                        {isAdmin && (
                            <Stack direction='row' spacing={1} sx={{ mt: 3, flexWrap: 'wrap' }}>
                                <Button variant='contained' onClick={() => setEditingBook(book)}>Edit</Button>
                                <Button variant='outlined' color='error' onClick={() => setDeletingBook(book)}>Delete</Button>
                            </Stack>
                        )}
                    </Grid>

                    <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant='outlined' startIcon={<ArrowBack />} onClick={() => navigate('/books')}>
                            Back to Books
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {editingBook && (
                <EditBookDialog
                    book={editingBook}
                    open={true}
                    onClose={() => setEditingBook(null)}
                    onEdit={async (bookId, payload) => {
                        await onEdit(bookId, payload);
                        await fetch();
                        setEditingBook(null);
                    }}
                />
            )}

            {deletingBook && (
                <DeleteBookDialog
                    book={deletingBook}
                    open={true}
                    onClose={() => setDeletingBook(null)}
                    onDelete={async (bookId) => {
                        await onDelete(bookId);
                        setDeletingBook(null);
                        navigate('/books');
                    }}
                />
            )}
        </Box>
    );
};

export default BookDetailsPage;



