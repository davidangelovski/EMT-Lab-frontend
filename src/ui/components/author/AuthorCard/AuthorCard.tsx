import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router';
import type { Author } from '../../../../api/types/author';

interface AuthorCardProps {
    author: Author;
}

const AuthorCard = ({ author }: AuthorCardProps) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='h6' gutterBottom>
                    {author.name} {author.surname}
                </Typography>
                <Stack direction='row' spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                    <Chip label={author.country.name} size='small' color='primary' variant='outlined' />
                    <Chip label={author.country.continent} size='small' color='secondary' variant='outlined' />
                </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button component={Link} to={`/authors/${author.id}`} startIcon={<InfoIcon />}>
                    Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default AuthorCard;


