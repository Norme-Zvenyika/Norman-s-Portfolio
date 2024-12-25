import { Box, List, ListItem, ListItemText } from '@mui/material'
import { Section } from '../../types/section'

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
      p: 3
    }}>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1 
      }}>
        <Box sx={{ mb: 4 }}>
          <img 
            src="/profile.jpg" 
            alt="Profile"
            style={{
              maxWidth: '10rem',
              maxHeight: '10rem',
              borderRadius: '50%',
              border: '0.5rem solid rgba(255, 255, 255, 0.2)'
            }}
          />
        </Box>
        
        <List sx={{ 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {sections.map(({ id, title }) => (
            <ListItem 
              key={id} 
              sx={{ 
                textAlign: 'center',
                color: 'common.white',
                '& .MuiTypography-root': {
                  fontWeight: 800,
                  letterSpacing: '0.05rem',
                  textTransform: 'uppercase'
                }
              }}
            >
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default DesktopSidebar