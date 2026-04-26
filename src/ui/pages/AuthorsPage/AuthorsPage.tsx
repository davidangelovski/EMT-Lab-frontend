import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import useAuthors from '../../../hooks/useAuthors';
import AuthorGrid from '../../components/author/AuthorGrid/AuthorGrid';

const AuthorsPage = () => {
    const { authors, loading, error } = useAuthors();

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
        <Box>
            <Typography variant='h4' gutterBottom>
                Authors
            </Typography>
            <AuthorGrid authors={authors} />
        </Box>
    );
};

export default AuthorsPage;


