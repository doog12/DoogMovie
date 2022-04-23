import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../index'

import AvatarModal from '../../../components/AvatarModal/AvatarModal'
import ProfileSocialMedia from './ProfileSocialMedia/ProfileSocialMedia'
import { SocialMedia, UserInfoResponse } from '../../../models/response/UserInfoResponse'

import './ProfileUserInfo.scss'

const ProfileUserInfo = () => {
    const { store } = useContext(Context)

    const params = useParams()
    const userId: string | undefined = params.user_id // userId from link

    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    const [user, setUser] = useState<UserInfoResponse>()

    const [updateData, setUpdateData] = useState<boolean>(false)
    // Fetching user data to visualise it on Profile page
    useEffect(() => {
        store.getUserInfo(userId).then((response) => setUser(response?.data))
    }, [updateData])

    const [isAvatarModal, setAvatarModal] = useState<boolean>(false)

    const socialMedias = user ? user.socialMedia : {} as SocialMedia
    const email = user ? user.email : ''


    return (
        <div className="profile-page__user">
            <div className='profile-page__user__mesh'>
                <div
                    className="profile-page__user__avatar"
                    onClick={() => setAvatarModal(!isAvatarModal)}
                >
                    <img
                        src={`${SERVER_URL}/avatar/${user?.avatar || 'default-user.png'}`}
                        className="non-draggable"
                        alt="avatar"
                    />
                </div>
            </div>

            <AvatarModal
                isAvatarModal={isAvatarModal}
                setAvatarModal={setAvatarModal}
                setUpdateData={setUpdateData}
                updateData={updateData}
            />


            <div className='profile-page__container'>

                <div className='profile-page__user__username'>
                    <p>{user?.name}</p>
                </div>

                <ProfileSocialMedia socialMedias={socialMedias} email={email} />

            </div>

        </div>
    )
}

export default observer(ProfileUserInfo)
