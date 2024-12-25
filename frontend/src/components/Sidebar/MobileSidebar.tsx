import { useState, useEffect } from 'react'
import { AppBar, Toolbar, IconButton, Box, Typography, Collapse } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { Section } from '../../types/section'
import { Navigation } from '../Navigation/Navigation'

interface Props {
  sections: Section[]
}

const MobileSidebar = ({ sections }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleCloseNav = () => setIsExpanded(false)
    window.addEventListener('closeNav', handleCloseNav)
    return () => window.removeEventListener('closeNav', handleCloseNav)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isExpanded])

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'primary.main',
        width: '100%'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'common.white',
            fontWeight: 500
          }}
        >
          Norman's Portfolio
        </Typography>
        <IconButton
          color="inherit"
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            transition: 'transform 0.2s ease',
            '&:active': {
              transform: 'scale(0.9)'
            }
          }}
        >
          {isExpanded ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>

      <Collapse in={isExpanded}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2
        }}>
          <Navigation sections={sections} isMobile={true} />
        </Box>
      </Collapse>
    </AppBar>
  )
}

export default MobileSidebar