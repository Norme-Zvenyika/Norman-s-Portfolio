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
        maxWidth: {
          md: '100%',
          lg: '90%'     
        },
        padding: {
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3
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