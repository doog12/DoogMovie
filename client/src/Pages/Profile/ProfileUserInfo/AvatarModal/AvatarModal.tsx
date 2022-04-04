import React, { useContext, useState } from 'react'

import Dropzone from '../../../../components/Dropzone/Dropzone'

import './AvatarModal.scss'
import { Context } from '../../../../index'
import { observer } from 'mobx-react-lite'
import $api from '../../../../http'

const AvatarModal = ({ isAvatarModal, setAvatarModal }: { isAvatarModal: boolean, setAvatarModal: React.Dispatch<React.SetStateAction<boolean>> })  => {

    const { store } = useContext(Context)
    const userId: string = store.user.id

    const [file, setFile] = useState<File[]>([])
    const [isFile, setIsFile] = useState<boolean>(false)



    const saveButtonHandler = () => {
        const formData = new FormData()

        formData.append('file', file![0])
        formData.append('userId', userId)

        $api.post('/upload_avatar', formData)
            .then(() => {
                setFile([])
                setIsFile(false)
                setAvatarModal(!isAvatarModal)
            })
    }

    const resetButtonHandler = () => {
        setFile([])
        setIsFile(false)
    }

    const deleteButtonHandler = () => {
        $api.delete('/delete_avatar', {
            data: { userId }
        })
            .then(() => {
                setAvatarModal(!isAvatarModal)
            })
    }

    return (
        <div className={`avatar-modal ${isAvatarModal ? 'active' : ''}`}>
            <div className='avatar-modal__content'>
                <div className='avatar-modal__content__header'>
                    <h3>Изменить аватар профиля</h3>
                </div>

                <div className='avatar-modal__content__uploader'>
                    <div className='avatar-modal__content__uploader__field'>
                        <Dropzone setIsFile={setIsFile} setFile={setFile}/>
                    </div>
                </div>

                <div className='avatar-modal__content__footer'>
                    <div className='avatar-modal__content__footer__left-side'>
                        <button className="avatar-modal__button delete-avatar" onClick={() => deleteButtonHandler()}>Удалить текущий аватар</button>
                    </div>
                    <div className='avatar-modal__content__footer__right-side'>
                        <button className="avatar-modal__button reset-avatar" disabled={!isFile} onClick={() => resetButtonHandler()}>Сбросить</button>
                        <button className="avatar-modal__button save-avatar" disabled={!isFile} onClick={() => saveButtonHandler()}>Сохранить аватарку</button>
                    </div>

                </div>

            </div>

            <div className='avatar-modal__blur' onClick={() => setAvatarModal(!isAvatarModal)} />
        </div>
    )
}

export default observer(AvatarModal)