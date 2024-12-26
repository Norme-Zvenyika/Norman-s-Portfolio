// src/components/Layout/AppLayout.tsx
import { Box } from '@mui/material'
import DesktopSidebar from '../Sidebar/DesktopSidebar'
import MobileSidebar from '../Sidebar/MobileSidebar'
import MainContent from '../MainContent/MainContent'
import sectionsData from '../../data/sections.json'

const AppLayout = () => {
  const { sections } = sectionsData

  return (
    <Box 
      sx={{
        display: 'flex',
        minHeight: '100vh',
        overflowX: 'hidden' // Prevent horizontal scrolling
      }}
    >
      {/* Desktop Sidebar - hidden on mobile */}
      <Box 
        sx={{ 
          display: { xs: 'none', md: 'block' },
          width: '240px',
          position: 'fixed',
          height: '100vh'
        }}
      >
        <DesktopSidebar sections={sections} />
      </Box>

      {/* Main Content Wrapper */}
      <Box
        sx={{
          width: { xs: '100%', md: 'calc(100% - 240px)' },
          marginLeft: { xs: 0, md: '240px' },
          overflowX: 'hidden', // Also prevent horizontal scrolling here
        }}
      >
        {/* Mobile Header */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <MobileSidebar sections={sections} />
        </Box>

        {/* Main Content */}
        <MainContent sections={sections} />
      </Box>
    </Box>
  )
}

export default AppLayout