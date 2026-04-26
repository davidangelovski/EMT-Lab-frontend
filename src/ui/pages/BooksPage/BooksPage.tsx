import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import useBooks from '../../../hooks/useBooks';
import BookGrid from '../../components/book/BookGrid/BookGrid';

const BooksPage = () => {
    const { books, loading, error } = useBooks();

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
                Books
            </Typography>
            <BookGrid books={books} />
        </Box>
    );
};

export default BooksPage;


