import { List } from '@mui/material'
import { Section } from '../../types/section'
import { NavItem } from './NavItem'

interface NavigationProps {
  sections: Section[]
  isMobile?: boolean
}

export const Navigation = ({ sections, isMobile = false }: NavigationProps) => {
  if (isMobile) {
    return (
      <>
        {sections.map((section) => (
          <NavItem 
            key={section.id} 
            section={section}
            isMobile={true}
          />
        ))}
      </>
    )
  }

  return (
    <List sx={{ 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }}>
      {sections.map((section) => (
        <NavItem 
          key={section.id} 
          section={section}
        />
      ))}
    </List>
  )
}