import { Box } from '@mui/material'
import sectionsData from '../../data/sections.json'

const MainContent = () => {
  const { sections } = sectionsData

  return (
    <Box sx={{ 
      width: {
        xs: '100%',
        md: 'calc(100% - 240px)' // account for sidebar width on desktop
      },
      marginLeft: {
        xs: 0,
        md: '240px'  // push content right of sidebar on desktop
      }
    }}>
      {sections.map(({ id, title }) => (
        <Box key={id}>
          <Box sx={{ 
            minHeight: '100vh', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa',
            padding: 3
          }}>
            {title} Section
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default MainContent