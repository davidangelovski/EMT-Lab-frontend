import { Alert, Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import {useAuth} from "../../../../context/AuthContext.tsx";
import type {AuthLog} from "../../../../api/types/auth.ts";
import useAuthLogs from "../../../../hooks/useAuthLogs.ts";
import AuthLogGrid from "../../../components/authlog/AuthLogGrid/AuthLogGrid.tsx";
import DeleteAuthLogDialog from "../../../components/authlog/DeleteAuthLogDialog/DeleteAuthLogDialog.tsx";

const AuthLogsPage = () => {
    const { AuthLogs, loading, error, onDelete } = useAuthLogs();
    const { isAdmin } = useAuth();
    const [deletingAuthLog, setDeletingAuthLog] = useState<AuthLog | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);


    const handleDelete = async (id: number) => {
        try {
            setActionError(null);
            await onDelete(id);
        } catch (err) {
            setActionError(err instanceof Error ? err.message : 'Unable to delete AuthLog.');
            throw err;
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity='error'>{error.message}</Alert>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { sm: 'center' }, justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant='h4' gutterBottom sx={{ mb: 0.5 }}>
                            AuthLogs
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            {AuthLogs.length} AuthLog{AuthLogs.length === 1 ? '' : 's'} in the catalog
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            {actionError && <Alert severity='error' onClose={() => setActionError(null)}>{actionError}</Alert>}

            {AuthLogs.length === 0 ? (
                <Alert severity='info'>No AuthLogs found.</Alert>
            ) : (
                <AuthLogGrid
                    AuthLogs={AuthLogs}
                    canManage={isAdmin}
                    onDelete={(AuthLog) => setDeletingAuthLog(AuthLog)}
                />
            )}

            {deletingAuthLog && (
                <DeleteAuthLogDialog
                    AuthLog={deletingAuthLog}
                    open={true}
                    onClose={() => setDeletingAuthLog(null)}
                    onDelete={handleDelete}
                />
            )}
        </Box>
    );
};

export default AuthLogsPage;


