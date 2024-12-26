import { useState } from 'react';
import { TextField, Button, Alert, Snackbar, Typography, Paper, Stack } from '@mui/material';
import { Send } from '@mui/icons-material';
import { BaseSection } from './BaseSection';
import { ContactContent, ContactFormData, ContactFormErrors, SnackbarState, Section } from '../../types/section';

interface ContactSectionProps {
    section: Section;
    content: ContactContent
}

export default function ContactSection({ section, content}: ContactSectionProps) {
    // Form state management
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState<ContactFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: 'success',
    });

    // Form validation and error handling
    const validateForm = (): boolean => {
        const newErrors: ContactFormErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name as keyof ContactFormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // Form submission and API handling
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('https://portfolio-backend-dh64.onrender.com/messages', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Origin': window.location.origin
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || 'Failed to send message');
            }

            setSnackbar({
                open: true,
                message: 'Message sent successfully!',
                severity: 'success'
            });

            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
            setSnackbar({
                open: true,
                message: errorMessage,
                severity: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSnackbarClose = () => 
        setSnackbar(prev => ({ ...prev, open: false }));

    return (
        <BaseSection id={section.id}>
            <Stack spacing={4}>
                <Stack spacing={2}>
                    <Typography variant="h1" gutterBottom>
                        {section.title}
                    </Typography>
                    <Typography 
                        variant="body1"
                        sx={{ textAlign: 'justify' }}
                    >
                        {content.message}
                    </Typography>
                </Stack>

                <Paper 
                    elevation={3}
                    sx={{
                        p: { xs: 3, sm: 4, md: 5 },
                        borderRadius: 2,
                    }}
                >
                    <Stack
                        component="form"
                        onSubmit={handleSubmit}
                        spacing={{ xs: 2.5, sm: 3, md: 4 }}
                    >
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            error={!!errors.message}
                            helperText={errors.message}
                            multiline
                            rows={5}
                            fullWidth
                            required
                        />

                        <Stack alignItems="center">
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting}
                                startIcon={<Send />}
                                sx={{
                                    px: { xs: 2, sm: 2.5, md: 3 },
                                    py: { xs: 1, sm: 1.25, md: 1.5 },
                                    fontSize: {
                                        xs: '0.875rem',
                                        sm: '0.9rem',
                                        md: '1rem'
                                    },
                                    border: '2px solid transparent',
                                    '&:hover': {
                                        bgcolor: 'transparent',
                                        color: 'primary.main',
                                        border: '2px solid',
                                        borderColor: 'primary.main'
                                    }
                                }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </BaseSection>
    );
}