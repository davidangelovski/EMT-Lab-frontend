import { Grid } from '@mui/material';
import type { Book } from '../../../../api/types/book';
import BookCard from '../BookCard/BookCard';

interface BookGridProps {
    books: Book[];
    canManage?: boolean;
    onEdit?: (book: Book) => void;
    onDelete?: (book: Book) => void;
}

const BookGrid = ({ books, canManage = false, onEdit, onDelete }: BookGridProps) => {
    return (
        <Grid container spacing={3}>
            {books.map((book) => (
                <Grid key={book.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <BookCard book={book} canManage={canManage} onEdit={onEdit} onDelete={onDelete} />
                </Grid>
            ))}
        </Grid>
    );
};

export default BookGrid;

