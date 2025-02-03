import { Box, Typography, Stack } from '@mui/material'
import { BaseSection } from './BaseSection'
import { Section, EducationContent } from '../../types/section'

interface EducationSectionProps {
  section: Section
  content: EducationContent
}

export const EducationSection = ({ section, content }: EducationSectionProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const sortedEducation = [...content.education].sort((a, b) => {
    // first compare end dates - null (Present) should come first
    if (!a.endDate && b.endDate) return -1;
    if (a.endDate && !b.endDate) return 1;
    if (!a.endDate && !b.endDate) {
      // if both are present, compare start dates
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    }
    
    // if both have end dates, compare them first
    const endDateComparison = new Date(b.endDate!).getTime() - new Date(a.endDate!).getTime();
    if (endDateComparison !== 0) return endDateComparison;
    
    // if end dates are the same, compare start dates
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <BaseSection id={section.id}>
      <Typography variant="h2" gutterBottom>
        {section.title}
      </Typography>
      
      <Stack spacing={6}>
        {sortedEducation.map((edu, index) => (
          <Box key={index}>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography variant="h5" component="div">
                  {edu.universityName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {formatDate(edu.startDate)} - {edu.expectedDate ? 'Expected ' : ''}{formatDate(edu.endDate)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography variant="h6" color="primary">
                  {edu.degreeType} in {edu.major}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {edu.location.city}{edu.location.state ? `, ${edu.location.state}` : ''}, {edu.location.country}
                </Typography>
              </Box>

              {edu.description && (
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {edu.description}
                </Typography>
              )}

              {edu.honorSocieties.length > 0 && (
                <Typography variant="body1">
                  <strong>Honor Societies:</strong> {edu.honorSocieties.join(', ')}
                </Typography>
              )}

              {edu.cumulativeGPA && (
                <Typography variant="body1">
                  <strong>GPA:</strong> {edu.cumulativeGPA.toFixed(2)}
                </Typography>
              )}

              {edu.relevantCourses.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Relevant Coursework:
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 3 }}>
                    {edu.relevantCourses.map((course, idx) => (
                      <Box component="li" key={idx} sx={{ mb: 1 }}>
                        <Typography variant="body1">
                          <strong>{course.courseId}: {course.courseTitle}</strong>
                          {course.courseDescription && (
                            <Typography component="span" color="text.secondary">
                              {` - ${course.courseDescription}`}
                            </Typography>
                          )}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Stack>
          </Box>
        ))}
      </Stack>
    </BaseSection>
  )
}