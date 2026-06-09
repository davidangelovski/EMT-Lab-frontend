import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router';
import type { Book } from '../../../../api/types/book';

interface BookCardProps {
    book: Book;
    canManage?: boolean;
    onEdit?: (book: Book) => void;
    onDelete?: (book: Book) => void;
}

const BookCard = ({ book, canManage = false, onEdit, onDelete }: BookCardProps) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4 }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='h6' gutterBottom>
                    {book.name}
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                    by {book.authorName} {book.authorSurname}
                </Typography>
                <Stack direction='row' spacing={1} useFlexGap sx={{ mb: 2, flexWrap: 'wrap' }}>
                    <Chip label={book.category} size='small' color='primary' variant='outlined' />
                    <Chip label={book.state} size='small' color='secondary' variant='outlined' />
                    <Chip label={book.country} size='small' variant='outlined' />
                </Stack>
                <Typography variant='body2'>Available copies: {book.availableCopies}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                <Button component={Link} to={`/books/${book.id}`} startIcon={<InfoIcon />}>
                    Details
                </Button>
                {canManage && (
                    <Stack direction='row' spacing={1} sx={{ ml: 'auto' }}>
                        <Button onClick={() => onEdit?.(book)} startIcon={<EditIcon />} size='small'>
                            Edit
                        </Button>
                        <Button onClick={() => onDelete?.(book)} startIcon={<DeleteIcon />} color='error' size='small'>
                            Delete
                        </Button>
                    </Stack>
                )}
            </CardActions>
        </Card>
    );
};

export default BookCard;


