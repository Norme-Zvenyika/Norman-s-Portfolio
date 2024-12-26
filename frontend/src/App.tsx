import AppLayout from './components/Layout/AppLayout'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme/theme'

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <AppLayout />
    </ThemeProvider>
  )
}

export default App;