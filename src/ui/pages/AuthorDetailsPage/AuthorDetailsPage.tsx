import { Alert, Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router';
import useAuthor from '../../../hooks/useAuthor';

const AuthorDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { author, loading, error } = useAuthor(id);

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
                            {author.country.name}
                        </Typography>
                        <Stack direction='row' spacing={1} useFlexGap sx={{ mb: 3, flexWrap: 'wrap' }}>
                            <Chip label={`Country: ${author.country.name}`} color='primary' variant='outlined' />
                            <Chip label={`Continent: ${author.country.continent}`} color='secondary' variant='outlined' />
                        </Stack>
                        <Typography variant='body2' color='text.secondary'>
                            Author ID: {author.id}
                        </Typography>
                    </Grid>

                    <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant='outlined' startIcon={<ArrowBack />} onClick={() => navigate('/authors')}>
                            Back to Authors
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default AuthorDetailsPage;



