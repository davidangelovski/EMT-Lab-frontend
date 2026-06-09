import { Alert, Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router';
import useAuthor from '../../../hooks/useAuthor';
import { useState } from 'react';
import type { Author } from '../../../api/types/author';
import { useAuth } from '../../../context/AuthContext';
import EditAuthorDialog from '../../components/author/EditAuthorDialog/EditAuthorDialog';
import DeleteAuthorDialog from '../../components/author/DeleteAuthorDialog/DeleteAuthorDialog';
import useAuthors from '../../../hooks/useAuthors';

const AuthorDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { author, loading, error, fetch } = useAuthor(id);
    const { onEdit, onDelete } = useAuthors();
    const { isAdmin } = useAuth();
    const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
    const [deletingAuthor, setDeletingAuthor] = useState<Author | null>(null);

    if (error) {
        return <Alert severity='error'>{error.message}</Alert>;
    }

    if (loading || !author) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
                <Link to='/authors' style={{ textDecoration: 'none', color: 'inherit' }}>
                    Authors
                </Link>
                <Typography color='text.primary'>{author.name} {author.surname}</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Avatar
                            variant='rounded'
                            sx={{ width: '100%', height: 220, bgcolor: 'secondary.main', fontSize: '3rem' }}
                        >
                            {author.name.charAt(0)}{author.surname.charAt(0)}
                        </Avatar>
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }}>
                        <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                            {author.name} {author.surname}
                        </Typography>
                        <Typography variant='h5' sx={{ mb: 2 }}>
                            {author.countryName}
                        </Typography>
                        <Stack direction='row' spacing={1} useFlexGap sx={{ mb: 3, flexWrap: 'wrap' }}>
                            <Chip label={`Country: ${author.countryName}`} color='primary' variant='outlined' />
                        </Stack>
                        <Typography variant='body2' color='text.secondary'>
                            Author ID: {author.id}
                        </Typography>

                        {isAdmin && (
                            <Stack direction='row' spacing={1} sx={{ mt: 3, flexWrap: 'wrap' }}>
                                <Button variant='contained' onClick={() => setEditingAuthor(author)}>Edit</Button>
                                <Button variant='outlined' color='error' onClick={() => setDeletingAuthor(author)}>Delete</Button>
                            </Stack>
                        )}
                    </Grid>

                    <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant='outlined' startIcon={<ArrowBack />} onClick={() => navigate('/authors')}>
                            Back to Authors
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {editingAuthor && (
                <EditAuthorDialog
                    author={editingAuthor}
                    open={true}
                    onClose={() => setEditingAuthor(null)}
                    onEdit={async (authorId, payload) => {
                        await onEdit(authorId, payload);
                        await fetch();
                        setEditingAuthor(null);
                    }}
                />
            )}

            {deletingAuthor && (
                <DeleteAuthorDialog
                    author={deletingAuthor}
                    open={true}
                    onClose={() => setDeletingAuthor(null)}
                    onDelete={async (authorId) => {
                        await onDelete(authorId);
                        setDeletingAuthor(null);
                        navigate('/authors');
                    }}
                />
            )}
        </Box>
    );
};

export default AuthorDetailsPage;



