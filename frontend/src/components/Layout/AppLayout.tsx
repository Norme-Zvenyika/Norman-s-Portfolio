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
                overflowX: 'hidden'
            }}
        >
            {/* Desktop Sidebar - hidden on mobile */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: '240px',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    height: '100vh',
                    zIndex: 1200
                }}
            >
                <DesktopSidebar sections={sections} />
            </Box>

            {/* Main Content Wrapper */}
            <Box
                component="main"
                sx={{
                    width: { xs: '100%', md: 'calc(100% - 288px)' },
                    ml: { xs: 0, md: '288px' },
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