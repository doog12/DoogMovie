import React, { useCallback, useMemo } from 'react'

import { useDropzone } from 'react-dropzone'


const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#383838',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(255,255,255,0)',
    color: '#2a2a2a',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    minHeight: '300px'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#c53553'
};



const Dropzone = ({setIsFile, setFile}: {setIsFile: React.Dispatch<React.SetStateAction<boolean>>, setFile: React.Dispatch<React.SetStateAction<File[]>>}) => {

    const onDropAccepted = useCallback((file: File[]) => {
        setFile(file)
        setIsFile(true)
    }, [])
    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: 'image/jpeg, image/png',
        maxFiles: 1,
        maxSize: 500000,
        onDropAccepted
    });
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragAccept,
        isDragReject
    ]);
    return (
        // @ts-ignore
        <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p className="unselectable">Перетащите файл сюда или нажмите, чтобы выбрать файлы</p>
            <em className="unselectable">(Принимаются только изображения *.jpeg и *.png)</em>
        </div>
    )
}

export default Dropzone