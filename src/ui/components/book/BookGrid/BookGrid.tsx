import { Grid } from '@mui/material';
import type { Book } from '../../../../api/types/book';
import BookCard from '../BookCard/BookCard';

interface BookGridProps {
    books: Book[];
}

const BookGrid = ({ books }: BookGridProps) => {
    return (
        <Grid container spacing={3}>
            {books.map((book) => (
                <Grid key={book.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <BookCard book={book} />
                </Grid>
            ))}
        </Grid>
    );
};

export default BookGrid;

