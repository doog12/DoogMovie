import TelegramIcon from '../../../../../assets/images/Profile/social-media-icons/telegram-icon.svg'
import { authValidation } from '../../../../../validation/auth-validation'
import LinkedInIcon from '../../../../../assets/images/Profile/social-media-icons/linkedin-icon.svg'
import FacebookIcon from '../../../../../assets/images/Profile/social-media-icons/facebook-icon.svg'
import ViberIcon from '../../../../../assets/images/Profile/social-media-icons/viber-icon.svg'
import WhatsAppIcon from '../../../../../assets/images/Profile/social-media-icons/whatsapp-icon.svg'
import React from 'react'

interface SocialMediaItem {
    title: string,
    name: string
    icon: string,
    placeholder: string,
    inputMode: React.HTMLAttributes<HTMLLIElement>['inputMode'],
    validation: any,
    inputType?: React.HTMLInputTypeAttribute
}

export const items: Array<SocialMediaItem> = [
    {
        title: 'Telegram',
        name: 'telegram',
        icon: TelegramIcon,
        placeholder: '@username',
        inputMode: 'email',
        validation: authValidation.telegram
    },
    {
        title: 'LinkedIn',
        name: 'linkedIn',
        icon: LinkedInIcon,
        placeholder: 'Your LinkedIn username',
        inputMode: 'email',
        validation: authValidation.linkedIn
    },
    {
        title: 'Facebook',
        name: 'facebook',
        icon: FacebookIcon,
        placeholder: 'Your Facebook username',
        inputMode: 'email',
        validation: authValidation.facebook
    },
    {
        title: 'Viber',
        name: 'viber',
        icon: ViberIcon,
        placeholder: '+38 (0xx) xxx-xxxx',
        inputType: 'tel',
        inputMode: 'tel',
        validation: authValidation.viber
    },
    {
        title: 'WhatsApp',
        name: 'whatsApp',
        icon: WhatsAppIcon,
        placeholder: '+38 (0xx) xxx-xxxx',
        inputType: 'tel',
        inputMode: 'tel',
        validation: authValidation.whatsApp
    }
]