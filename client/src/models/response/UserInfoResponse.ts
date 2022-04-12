export interface UserInfoResponse {
    _id: string
    name: string
    email: string
    password: string
    isActivated: boolean
    activationLink: string
    avatar: string
}
