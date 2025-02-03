import { Box, Divider } from '@mui/material'
import {AboutSection}  from '../Sections/AboutSection'
import ContactSection  from '../Sections/ContactSection'
import { ExperienceSection } from '../Sections/ExperienceSection'
import { Section } from '../../types/section'
import aboutContent from '../../data/about.json'
import experienceContent from '../../data/experience.json'
import contactContent from '../../data/contact.json'

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
          {section.id === 'experience' && (
            <ExperienceSection section={section} content={experienceContent} />
          )}
          {section.id === 'contact' && (
            <ContactSection section={section} content={contactContent}/>
          )}
          {index !== sections.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  )
}

export default MainContent
