import { Box, IconButton, Button, Typography, Stack } from '@mui/material'
import { GitHub, LinkedIn, Download } from '@mui/icons-material'
import { BaseSection } from './BaseSection'
import { Section, AboutContent } from '../../types/section'

interface AboutSectionProps {
  section: Section
  content: AboutContent
}

export const AboutSection = ({ section, content }: AboutSectionProps) => {
  const getIcon = (iconName: string | undefined) => {
    if (!iconName) return null;
    switch (iconName.toLowerCase()) {
      case 'github':
        return <GitHub sx={{ fontSize: 25 }} />
      case 'linkedin':
        return <LinkedIn sx={{ fontSize: 25 }} />
      default:
        return null
    }
  }

  return (
    <BaseSection id={section.id}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h1" gutterBottom>
            {content.name}
          </Typography>
          <Typography variant="subtitle1">
            {content.location.city}, {content.location.country} | {content.email}
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'justify',
            whiteSpace: 'pre-line'
          }}
        >
          {content.bio}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          {content.links.map((link) => (
            <IconButton
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              size="large"
              sx={{
                p: { xs: 1, sm: 1.5, md: 2 },  // Responsive padding
                bgcolor: 'primary.main',
                color: 'white',
                border: '2px solid transparent',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: 'primary.main',
                  border: '2px solid',
                  borderColor: 'primary.main'
                }
              }}
            >
              {getIcon(link.icon)}
            </IconButton>
          ))}
          <Button
            variant="contained"
            href={content.resume.url}
            download
            size="medium"
            startIcon={<Download sx={{
              fontSize: {
                xs: 18,
                sm: 20,
                md: 22
              }
            }} />}
            sx={{
              px: { xs: 2, sm: 2.5, md: 3 },  // Responsive padding
              py: { xs: 0.75, sm: 1, md: 1.25 },  // Responsive height
              fontSize: {  // Responsive font size
                xs: '0.8rem',
                sm: '0.9rem',
                md: '1rem'
              },
              border: '2px solid transparent',
              '&:hover': {
                bgcolor: 'transparent',
                color: 'primary.main',
                border: '2px solid',
                borderColor: 'primary.main'
              }
            }}
          >
            {content.resume.label}
          </Button>
        </Stack>
      </Stack>
    </BaseSection>
  )
}