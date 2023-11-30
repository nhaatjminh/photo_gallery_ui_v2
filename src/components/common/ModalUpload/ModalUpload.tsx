import React, { useCallback, useState } from 'react'
import './ModalUpload.scss'
import Modal from '../Modal/Modal'
import CameraIcon from '~/assets/image/CameraIcon.png'
import PreviewPhoto from '~/components/PreviewPhoto/PreviewPhoto'
import Button from '../Button/Button'
import photosAPI from '~/services/api/PhotoApi'
import Loader from '../Loader/Loader'

interface IModalUpload {
  isShow: boolean
  setIsShow?: (show: boolean) => void
  onUploadSuccess: () => void
}

interface IFilePreview {
  name: string
  description: string
  image: File
  index: number
}

const ModalUpload: React.FC<IModalUpload> = ({ isShow, setIsShow, onUploadSuccess }) => {
  const [previewPhotos, setPreviewPhotos] = useState<IFilePreview[]>([])
  const [uploading, setUploading] = useState(false)

  const handleOnSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    if (e.target.files.length > 5) {
      alert('You can only upload a maximum of 5 files')
      return
    }
    const files: IFilePreview[] = Array.from(e.target.files).map((file, index) => {
      return {
        name: '',
        description: '',
        image: file,
        index: index
      }
    })
    setPreviewPhotos(files)
  }

  const UpLoadCard = () => (
    <div className='upload-card col l-3 m-4 c-6' style={{ height: previewPhotos.length ? 'unset' : '300px' }}>
      <div className='input-img'>
        <input type='file' accept='image/*' onChange={handleOnSelectImages} multiple />
        <div className='input-img-icon'>
          <img src={CameraIcon} />
        </div>
      </div>
    </div>
  )

  const handleOnNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const newArr = [...previewPhotos]
      newArr[index].name = e.target.value
      setPreviewPhotos(newArr)
    },
    [previewPhotos]
  )

  const handleOnDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
      const newArr = [...previewPhotos]
      newArr[index].description = e.target.value
      setPreviewPhotos(newArr)
    },
    [previewPhotos]
  )

  const handleOnUpload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    const formData = new FormData()
    previewPhotos.forEach((photo, index) => {
      formData.append(`image`, photo.image)
      formData.append(`name[${index}]`, photo.name)
      formData.append(`description[${index}]`, photo.description)
    })

    setUploading(true)
    const data = await photosAPI.uploadPhotos(formData)
    setUploading(false)
    if (data.result) {
      onUploadSuccess()
      if (setIsShow) setIsShow(false)
    } else {
      alert('Some thing went wrong! Please try again later!')
    }
  }

  return (
    <Modal className='modal-upload' isShow={isShow} setIsShow={setIsShow}>
      <div className='modal-upload__body'>
        <div className='grid wide'>
          <div className='row'>
            <UpLoadCard />

            {previewPhotos.map((previewPhoto, index) => (
              <PreviewPhoto
                key={index}
                name={previewPhoto.name}
                description={previewPhoto.description}
                image={previewPhoto.image}
                index={index}
                onNameChange={handleOnNameChange}
                onDescriptionChange={handleOnDescriptionChange}
              />
            ))}
          </div>
        </div>
        <div className='space'></div>

        <div className='group-btn'>
          <Button className='upload-btn' onClick={handleOnUpload} disabled={uploading}>
            {uploading ? <Loader small /> : 'Upload'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalUpload
