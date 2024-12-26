import { Box, Divider } from '@mui/material'
import { AboutSection } from '../Sections/AboutSection'
import { Section } from '../../types/section'
import aboutContent from '../../data/about.json'

interface Props {
  sections: Section[]
}

const MainContent = ({ sections }: Props) => {

  return (
    <Box
      sx={{
        width: '100%',
        scrollPaddingTop: {
          xs: '70px',
          md: 0,
        },
        minHeight: '100vh',
      }}
    >
      {sections.map((section, index) => (
        <Box key={section.id}>
          {section.id === 'about' && (
            <AboutSection section={section} content={aboutContent} />
          )}
          {index !== sections.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  )
}

export default MainContent
