import React, { Dispatch, SetStateAction, useState } from 'react'

import Dropzone from '../../../../components/Dropzone/Dropzone'
import $api from '../../../../http'

import './AvatarModal.scss'

interface AvatarModalProps {
    isAvatarModal: boolean,
    setAvatarModal: Dispatch<SetStateAction<boolean>>,
    setUpdateData: Dispatch<SetStateAction<boolean>>,
    updateData: boolean
}


const AvatarModal = ({ isAvatarModal, setAvatarModal, setUpdateData, updateData }: AvatarModalProps)  => {
    const [file, setFile] = useState<File[]>([])
    const [isFile, setIsFile] = useState<boolean>(false)



    const saveButtonHandler = () => {
        const formData = new FormData()

        formData.append('file', file![0])

        $api.post('/upload_avatar', formData)
            .then(() => {
                setFile([])
                setIsFile(false)
                setAvatarModal(!isAvatarModal)
                setUpdateData(!updateData)
            })
    }

    const resetButtonHandler = () => {
        setFile([])
        setIsFile(false)
    }

    const deleteButtonHandler = () => {
        $api.delete('/delete_avatar')
            .then(() => {
                setUpdateData(!updateData)
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

export default AvatarModal