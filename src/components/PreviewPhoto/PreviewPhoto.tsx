import React, { memo, useLayoutEffect, useState } from 'react'
import './PreviewPhoto.scss'
import Input from '../common/Input/Input'
import TextArea from '../common/TextArea/TextArea'

export interface IPreviewPhoto {
  name: string
  description: string
  image: File
  index: number
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void
}

const PreviewPhoto: React.FC<IPreviewPhoto> = ({
  name,
  description,
  image,
  index,
  onNameChange,
  onDescriptionChange
}) => {
  const [url, setURL] = useState('')
  useLayoutEffect(() => {
    const _url = URL.createObjectURL(image)
    setURL(_url)
  }, [image])
  return (
    <div className='col l-3 m-4 c-6'>
      <div className='preview-photo'>
        <div className='preview-photo__img'>
          <img src={url} />
        </div>
        <div className='preview-photo__content'>
          <Input
            className='preview-photo__content__input'
            value={name}
            placeholder='Name...'
            onChange={(e) => onNameChange(e, index)}
          />
          <TextArea
            className=''
            value={description}
            placeholder='Description...'
            onChange={(e) => onDescriptionChange(e, index)}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(PreviewPhoto)
