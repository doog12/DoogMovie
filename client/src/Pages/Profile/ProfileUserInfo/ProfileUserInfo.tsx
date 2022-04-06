import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../../../index'
import { UserInfoResponse } from '../../../models/response/UserInfoResponse'
import GreenCircle from '../../../assets/images/Profile/green-circle.png'
import RedCircle from '../../../assets/images/Profile/red-circle.png'
import AvatarModal from './AvatarModal/AvatarModal'

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
        store.getUserInfo(userId)
            .then((response) => setUser(response?.data))
    }, [updateData])


    const [isAvatarModal, setAvatarModal] = useState<boolean>(false)


    return (
        <div className="profile-page__user">
            <div className='profile-page__user__avatar' onClick={() => setAvatarModal(!isAvatarModal)}>
                <img src={`${SERVER_URL}/avatar/${user?.avatar || 'default-user.png'}`} className="non-draggable" alt='avatar'/>
            </div>

            <AvatarModal isAvatarModal={isAvatarModal} setAvatarModal={setAvatarModal} setUpdateData={setUpdateData} updateData={updateData}/>

            <div className='profile-page__user__info unselectable'>
                <div className='profile-page__user__info__name'>
                    <p>Имя: <span>{user?.name}</span></p>
                </div>
                <div className='profile-page__user__info__email'>
                    <div className='profile-page__user__info__email__text'>
                        <p>E-mail: <span>{user?.email}</span></p>
                    </div>
                    <div className='profile-page__user__info__email__is-confirmed'>
                        <img src={user?.isActivated ? GreenCircle : RedCircle} alt='circle' />
                        <p>{user?.isActivated ? 'Подтверждён' : 'Не подтверждён'}</p>
                    </div>
                </div>
                {/* TODO: Сделать возможность подтверждения тел. номера */}
                {/*<div className='profile-page__user__info__tel-number'><p>Номер телефона: <span>$number</span></p></div>*/}
            </div>
        </div>


    )
}

export default ProfileUserInfo