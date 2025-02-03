import { Box, Typography, Stack } from '@mui/material'
import { BaseSection } from './BaseSection'
import { Section, ExperienceContent } from '../../types/section'

interface ExperienceSectionProps {
  section: Section;
  content: ExperienceContent;
}

export const ExperienceSection = ({ section, content }: ExperienceSectionProps) => {
  const sortedExperiences = [...content.experiences].sort((a, b) => {
    // First compare end dates - null (Present) should come first
    if (!a.endDate && b.endDate) return -1;
    if (a.endDate && !b.endDate) return 1;
    if (!a.endDate && !b.endDate) {
      // If both are present, compare start dates
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    }
    
    // If both have end dates, compare them first
    const endDateComparison = new Date(b.endDate!).getTime() - new Date(a.endDate!).getTime();
    if (endDateComparison !== 0) return endDateComparison;
    
    // If end dates are the same, compare start dates
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <BaseSection id={section.id}>
      <Typography variant="h2" gutterBottom>
        {section.title}
      </Typography>
      
      <Stack spacing={6}>
        {sortedExperiences.map((experience, index) => (
          <Box key={index}>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography variant="h5" component="div">
                  {experience.position}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {experience.company}
                </Typography>
                {experience.location.city && (
                  <Typography variant="subtitle1" color="text.secondary">
                    {`${experience.location.city}${experience.location.state ? `, ${experience.location.state}` : ''}`}
                  </Typography>
                )}
              </Box>

              <Box component="ul" sx={{ m: 0, pl: 3 }}>
                {experience.responsibilities.map((responsibility, idx) => (
                  <Box component="li" key={idx} sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      {responsibility}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </BaseSection>
  )
}