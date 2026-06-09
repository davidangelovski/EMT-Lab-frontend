import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router';
import type { Author } from '../../../../api/types/author';

interface AuthorCardProps {
    author: Author;
    canManage?: boolean;
    onEdit?: (author: Author) => void;
    onDelete?: (author: Author) => void;
}

const AuthorCard = ({ author, canManage = false, onEdit, onDelete }: AuthorCardProps) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4 }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='h6' gutterBottom>
                    {author.name} {author.surname}
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                    Country: {author.countryName}
                </Typography>
                <Stack direction='row' spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                    <Chip label={author.countryName} size='small' color='primary' variant='outlined' />
                </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                <Button component={Link} to={`/authors/${author.id}`} startIcon={<InfoIcon />}>
                    Details
                </Button>
                {canManage && (
                    <Stack direction='row' spacing={1} sx={{ ml: 'auto' }}>
                        <Button onClick={() => onEdit?.(author)} startIcon={<EditIcon />} size='small'>
                            Edit
                        </Button>
                        <Button onClick={() => onDelete?.(author)} startIcon={<DeleteIcon />} color='error' size='small'>
                            Delete
                        </Button>
                    </Stack>
                )}
            </CardActions>
        </Card>
    );
};

export default AuthorCard;


