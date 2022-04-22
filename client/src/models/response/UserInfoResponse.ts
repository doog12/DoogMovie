export interface SocialMedia {
    telegram: string
    linkedIn: string
    facebook: string
    viber: string
    whatsApp: string
}

export interface UserInfoResponse {
    _id: string
    name: string
    email: string
    password: string
    telNumber: string
    isActivated: boolean
    activationLink: string
    avatar: string
    socialMedia: SocialMedia
}
