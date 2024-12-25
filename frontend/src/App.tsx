import { Box } from '@mui/material'
import Sidebar from './components/Sidebar/Sidebar'
import MainContent from './components/MainContent/MainContent'

function App(): JSX.Element {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: {
        xs: 'column',
        md: 'row'     
      }
    }}>
      <Sidebar />
      <MainContent />
    </Box>
  )
}

export default App