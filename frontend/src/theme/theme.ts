import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    h1: {
      fontSize: '5.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      '@media (max-width:900px)': {
        fontSize: '4rem',
      },
      '@media (max-width:600px)': {
        fontSize: '3rem',
      },
    },
    h2: {
      fontSize: '3.75rem',
      fontWeight: 600,
      '@media (max-width:900px)': {
        fontSize: '3rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h3: {
      fontSize: '3rem',
      fontWeight: 600,
      '@media (max-width:900px)': {
        fontSize: '2.5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h4: {
      fontSize: '2.5rem',
      fontWeight: 500,
      '@media (max-width:900px)': {
        fontSize: '2rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    subtitle1: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    subtitle2: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    body1: {
      fontSize: '1.25rem',
      lineHeight: 1.7,
      '@media (max-width:600px)': {
        fontSize: '1.125rem',
      },
    },
    body2: {
      fontSize: '1.125rem',
      lineHeight: 1.7
    }
  }
})