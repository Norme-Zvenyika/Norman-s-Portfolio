import { Box, BoxProps } from '@mui/material'
import { ReactNode } from 'react'

interface BaseSectionProps extends BoxProps {
  id: string
  children: ReactNode
}

export const BaseSection = ({ id, children, ...props }: BaseSectionProps) => {
  return (
    <Box 
      id={id}
      sx={{ 
        width: '100%', 
        backgroundColor: '#fafafa',
        padding: {
          xs: 3,
          sm: '32px 24px',
          md: '48px 64px',
          lg: '48px 80px'
        },
        scrollMarginTop: {
          xs: '70px',
          md: 0
        },
        wordBreak: 'break-word', 
        boxSizing: 'border-box',  
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Box>
  )
}