export interface Section {
    id: string
    title: string
    order: number
}

export interface SocialLink {
    url: string
    label: string
    icon?: string
}

export interface AboutContent {
    name: string
    bio: string
    location: {
        city: string
        country: string
    }
    email: string
    links: SocialLink[]
    resume: {
        url: string
        label: string
    }
}

export interface ContactContent {
    message: string
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface ContactFormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
}

interface Location {
    city?: string;
    state?: string;
}

export interface Experience {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    location: Location;
    responsibilities: string[];
}

export interface ExperienceContent {
    experiences: Experience[];
}