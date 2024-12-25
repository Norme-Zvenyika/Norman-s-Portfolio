import { Box } from '@mui/material'
import { Section } from '../../types/section'
import { Navigation } from '../Navigation/Navigation'

interface Props {
  sections: Section[]
}

const DesktopSidebar = ({ sections }: Props) => {
  return (
    <Box sx={{ 
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100vh',
      width: 240,
      backgroundColor: 'primary.main',
      display: 'flex',
      flexDirection: 'column',
      p: 3,
      boxShadow: 3
    }}>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1 
      }}>
        <Box sx={{ 
          mb: 4,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}>
          <img 
            src="/images/norman_head_shot.jpg" 
            alt="Profile"
            style={{
              maxWidth: '10rem',
              maxHeight: '10rem',
              borderRadius: '50%',
              border: '0.5rem solid rgba(255, 255, 255, 0.2)'
            }}
          />
        </Box>
        
        <Navigation sections={sections} />
      </Box>
    </Box>
  )
}

export default DesktopSidebar