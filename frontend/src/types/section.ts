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