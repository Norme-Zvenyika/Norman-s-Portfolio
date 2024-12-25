import { Box, Divider } from '@mui/material'
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
        md: '240px'
      }
    }}>
      {sections.map(({ id, title }, index) => (
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
          {index !== sections.length - 1 && (
            <Divider />
          )}
        </Box>
      ))}
    </Box>
  )
}

export default MainContent