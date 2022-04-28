import React from 'react'

import FacebookIcon from '../../../../assets/images/Profile/social-media-icons/facebook-icon.svg'
import LinkedInIcon from '../../../../assets/images/Profile/social-media-icons/linkedin-icon.svg'
import TelegramIcon from '../../../../assets/images/Profile/social-media-icons/telegram-icon.svg'
import ViberIcon from '../../../../assets/images/Profile/social-media-icons/viber-icon.svg'
import WhatsAppIcon from '../../../../assets/images/Profile/social-media-icons/whatsapp-icon.svg'
import MailIcon from '../../../../assets/images/Profile/social-media-icons/mail-icon.svg'

import './ProfileSocialMedia.scss'
import { SocialMedia } from '../../../../models/response/UserInfoResponse'

interface ProfileSocialMediaProps {
    socialMedias: SocialMedia,
    email: string
}

interface TypeOfSocialMediaResponse {
    link: string,
    icon: string
}

function typeOfSocialMedia(name: string, value?: string): TypeOfSocialMediaResponse {
    if (name === 'telegram') {
        return {
            link: `https://t.me/${value}`,
            icon: TelegramIcon
        }
    }
    if (name === 'facebook') {
        return {
            link: `https://facebook.com/${value}`,
            icon: FacebookIcon
        }
    }
    if (name === 'linkedIn') {
        return {
            link: `https://www.linkedin.com/in/${value}`,
            icon: LinkedInIcon
        }
    }
    if (name === 'viber') {
        return {
            link: `viber://chat?number=${value}`,
            icon: ViberIcon
        }
    }
    if (name === 'whatsApp') {
        return {
            link: `https://wa.me/${value}`,
            icon: WhatsAppIcon
        }
    }

    if (name === 'email') {
        return {
            link: `mailto:${value}`,
            icon: MailIcon
        }
    }

    return {} as TypeOfSocialMediaResponse
}

const ProfileSocialMedia = ({socialMedias, email}: ProfileSocialMediaProps) => {

    return (
        <div className="profile-page__user__social-media">

            <a href={typeOfSocialMedia('email', email).link}>
                <img src={typeOfSocialMedia('email', email).icon} className="profile-page__user__social-media__item unselectable non-draggable" alt='email' draggable="false" />
            </a>

            {
                Object.entries(socialMedias).map(([key, value]: Array<string>, index: number) => (
                    <a href={typeOfSocialMedia(key, value).link} target='_blank' rel="noreferrer" key={`${value}_${index}`}>
                        <img src={typeOfSocialMedia(key).icon} className="profile-page__user__social-media__item unselectable non-draggable" alt={key} draggable="false" />
                    </a>
                ))
            }
        </div>
    )
}

export default ProfileSocialMedia