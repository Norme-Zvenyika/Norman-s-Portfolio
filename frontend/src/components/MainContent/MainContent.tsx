import { Box, Divider } from '@mui/material'
import { AboutSection } from '../Sections/AboutSection'
import { Section } from '../../types/section'

interface Props {
  sections: Section[]
}

const MainContent = ({ sections }: Props) => {
  return (
    <Box sx={{
      width: '100%',
      scrollPaddingTop: {
        xs: '70px',
        md: 0
      },
      minHeight: '100vh'
    }}>
      {sections.map(({ id }, index) => (
        <Box key={id}>
          <AboutSection />
          {index !== sections.length - 1 && (
            <Divider />
          )}
        </Box>
      ))}
    </Box>
  )
}

export default MainContent