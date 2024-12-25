import { useTheme, useMediaQuery } from '@mui/material'
import MobileSidebar from './MobileSidebar'
import DesktopSidebar from './DesktopSidebar'
import sectionsData from '../../data/sections.json'

const Sidebar = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { sections } = sectionsData

  // Only render ONE of these based on screen size
  return isMobile ? (
    <MobileSidebar sections={sections} />
  ) : (
    <DesktopSidebar sections={sections} />
  )
}

export default Sidebar