import { Alert, Box, Button, Link as MuiLink, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import authApi from '../../../../api/authApi';
import type { AuthCredentials } from '../../../../api/types/auth';
import { useAuth } from '../../../../context/AuthContext';

interface AuthFormProps {
    mode: 'login' | 'register';
}

const copy = {
    login: {
        title: 'Welcome back',
        subtitle: 'Sign in to manage books and continue browsing the catalog.',
        submit: 'Login',
        switchText: 'Need an account?',
        switchLink: '/register',
        switchLabel: 'Register here'
    },
    register: {
        title: 'Create account',
        subtitle: 'Register to access the library app and start managing the catalog.',
        submit: 'Register',
        switchText: 'Already have an account?',
        switchLink: '/login',
        switchLabel: 'Login here'
    }
} as const;

const AuthForm = ({ mode }: AuthFormProps) => {
    const navigate = useNavigate();
    const { login, register } = useAuth();
    const [formData, setFormData] = useState<AuthCredentials>({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = mode === 'login'
                ? await authApi.login(formData)
                : await authApi.register(formData);

            const authAction = mode === 'login' ? login : register;
            authAction(formData, response.data);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Authentication failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: 'calc(100vh - 160px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ width: '100%', maxWidth: 480, p: 4, borderRadius: 4 }}>
                <Stack spacing={2} component='form' onSubmit={handleSubmit}>
                    <Box>
                        <Typography variant='h4' gutterBottom>
                            {copy[mode].title}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            {copy[mode].subtitle}
                        </Typography>
                    </Box>

                    {error && <Alert severity='error'>{error}</Alert>}

                    <TextField
                        label='Username'
                        value={formData.username}
                        onChange={(event) => setFormData((prev) => ({ ...prev, username: event.target.value }))}
                        required
                        autoComplete='username'
                        fullWidth
                    />

                    <TextField
                        label='Password'
                        type='password'
                        value={formData.password}
                        onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))}
                        required
                        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                        fullWidth
                    />

                    <Button type='submit' variant='contained' size='large' disabled={loading}>
                        {loading ? 'Please wait…' : copy[mode].submit}
                    </Button>

                    <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'center' }}>
                        {copy[mode].switchText}{' '}
                        <MuiLink component={Link} to={copy[mode].switchLink} underline='hover'>
                            {copy[mode].switchLabel}
                        </MuiLink>
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
};

export default AuthForm;


