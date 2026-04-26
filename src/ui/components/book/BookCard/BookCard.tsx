import { Card, CardActions, CardContent, Chip, Stack, Typography, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router';
import type { Book } from '../../../../api/types/book';

interface BookCardProps {
    book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='h6' gutterBottom>
                    {book.name}
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                    by {book.author.name} {book.author.surname}
                </Typography>
                <Stack direction='row' spacing={1} useFlexGap sx={{ mb: 2, flexWrap: 'wrap' }}>
                    <Chip label={book.category} size='small' color='primary' variant='outlined' />
                    <Chip label={book.state} size='small' color='secondary' variant='outlined' />
                </Stack>
                <Typography variant='body2'>Available copies: {book.available_copies}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button component={Link} to={`/books/${book.id}`} startIcon={<InfoIcon />}>
                    Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default BookCard;


