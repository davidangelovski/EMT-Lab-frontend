import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router';
import type { AuthLog } from '../../../../api/types/auth';

interface AuthLogCardProps {
    AuthLog: AuthLog;
    canManage?: boolean;
    onEdit?: (AuthLog: AuthLog) => void;
    onDelete?: (AuthLog: AuthLog) => void;
}

const AuthLogCard = ({ AuthLog, canManage = false, onEdit, onDelete }: AuthLogCardProps) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4 }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='h6' gutterBottom>
                    {AuthLog.username}
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                <Stack direction='row' spacing={1} useFlexGap sx={{ mb: 2, flexWrap: 'wrap' }}>
                    <Chip label={AuthLog.token} size='small' color='secondary' variant='outlined' />
                    <Chip label={AuthLog.issuedAt} size='small' color='secondary' variant='outlined' />
                    <Chip label={AuthLog.expiresAt} size='small' color='secondary' variant='outlined' />
                </Stack>
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                <Button component={Link} to={`/AuthLogs/${AuthLog.id}`} startIcon={<InfoIcon />}>
                    Details
                </Button>
                {canManage && (
                    <Stack direction='row' spacing={1} sx={{ ml: 'auto' }}>
                        <Button onClick={() => onEdit?.(AuthLog)} startIcon={<EditIcon />} size='small'>
                            Edit
                        </Button>
                        <Button onClick={() => onDelete?.(AuthLog)} startIcon={<DeleteIcon />} color='error' size='small'>
                            Delete
                        </Button>
                    </Stack>
                )}
            </CardActions>
        </Card>
    );
};

export default AuthLogCard;


