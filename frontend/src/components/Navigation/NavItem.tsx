import { ListItem, ListItemText, Box } from '@mui/material'
import { Section } from '../../types/section'

interface NavItemProps {
    section: Section
    isMobile?: boolean
}

export const NavItem = ({ section, isMobile = false }: NavItemProps) => {
    const handleClick = () => {
        const element = document.getElementById(section.id)
        if (element) {
            if (isMobile) {
                window.dispatchEvent(new CustomEvent('closeNav'))
            }
            setTimeout(() => {
                element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                })
            }, isMobile ? 100 : 0)
        }
    }

    const commonStyles = {
        cursor: 'pointer',
        textAlign: 'center',
        color: 'common.white',
        position: 'relative',
        '&:active': {
            transform: 'scale(0.98)'
        },
        '& .MuiTypography-root': {
            fontWeight: 600,
            letterSpacing: '0.05rem',
            textTransform: 'uppercase',
        },
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)'
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            width: '0',
            height: '2px',
            bottom: '-2px',
            left: '50%',
            backgroundColor: 'common.white',
            transition: 'all 0.3s ease-in-out',
        },
        '&:hover::after': {
            width: '100%',
            left: '0',
        }
    }

    if (isMobile) {
        return (
            <Box
                onClick={handleClick}
                sx={{
                    ...commonStyles,
                    py: 1,
                    width: '100%',
                    textAlign: 'center'
                }}
            >
                {section.title}
            </Box>
        )
    }

    return (
        <ListItem
            onClick={handleClick}
            sx={{
                ...commonStyles,
                width: 'auto',
                minWidth: '150px',
                py: 1,
                px: 2,
                transition: 'all 0.2s ease-in-out',
                '& .MuiListItemText-root': {
                    margin: 0
                },
                '&.MuiListItem-root': {
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.08)'
                    }
                }
            }}
        >
            <ListItemText 
                primary={section.title} 
                primaryTypographyProps={{
                    sx: {
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        letterSpacing: '0.05rem',
                        textTransform: 'uppercase',
                    }
                }}
            />
        </ListItem>
    )
}