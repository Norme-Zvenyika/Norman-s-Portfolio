import { useState } from 'react'
import { AppBar, Toolbar, IconButton, Box, Typography, Collapse } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Section } from '../../types/section'

interface Props {
  sections: Section[]
}

const MobileSidebar = ({ sections }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)

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
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Collapse in={isExpanded}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2
        }}>
          {sections.map(({ id, title }) => (
            <Box 
              key={id}
              sx={{
                color: 'common.white',
                textTransform: 'uppercase',
                fontWeight: 800,
                letterSpacing: '0.05rem',
                py: 1,
                cursor: 'pointer'
              }}
            >
              {title}
            </Box>
          ))}
        </Box>
      </Collapse>
    </AppBar>
  )
}

export default MobileSidebar