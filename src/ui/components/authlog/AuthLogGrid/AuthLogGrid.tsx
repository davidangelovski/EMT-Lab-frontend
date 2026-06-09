import { Grid } from '@mui/material';
import type { AuthLog } from '../../../../api/types/auth';
import AuthLogCard from '../AuthLogCard/AuthLogCard';

interface AuthLogGridProps {
    AuthLogs: AuthLog[];
    canManage?: boolean;
    onEdit?: (AuthLog: AuthLog) => void;
    onDelete?: (AuthLog: AuthLog) => void;
}

const AuthLogGrid = ({ AuthLogs, canManage = false, onDelete }: AuthLogGridProps) => {
    return (
        <Grid container spacing={3}>
            {AuthLogs.map((AuthLog) => (
                <Grid key={AuthLog.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <AuthLogCard AuthLog={AuthLog} canManage={canManage} onDelete={onDelete} />
                </Grid>
            ))}
        </Grid>
    );
};

export default AuthLogGrid;

