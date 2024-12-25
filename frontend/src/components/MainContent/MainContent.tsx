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
      },
      // add scroll-padding-top to account for mobile header
      scrollPaddingTop: {
        xs: '40px', // height of mobile header
        md: 0
      }
    }}>
      {sections.map(({ id, title }, index) => (
        <Box key={id}>
          <Box 
            id={id}  // Add the ID here for scroll targeting
            sx={{ 
              minHeight: '100vh', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fafafa',
              padding: 3,
              scrollMarginTop: {  // Add scroll margin for better positioning
                xs: '64px',  // height of mobile header
                md: 0
              }
            }}
          >
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