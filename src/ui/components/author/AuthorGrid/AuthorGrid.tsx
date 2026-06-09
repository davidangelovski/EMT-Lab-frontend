import { Grid } from '@mui/material';
import type { Author } from '../../../../api/types/author';
import AuthorCard from '../AuthorCard/AuthorCard';

interface AuthorGridProps {
    authors: Author[];
    canManage?: boolean;
    onEdit?: (author: Author) => void;
    onDelete?: (author: Author) => void;
}

const AuthorGrid = ({ authors, canManage = false, onEdit, onDelete }: AuthorGridProps) => {
    return (
        <Grid container spacing={3}>
            {authors.map((author) => (
                <Grid key={author.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <AuthorCard author={author} canManage={canManage} onEdit={onEdit} onDelete={onDelete} />
                </Grid>
            ))}
        </Grid>
    );
};

export default AuthorGrid;

