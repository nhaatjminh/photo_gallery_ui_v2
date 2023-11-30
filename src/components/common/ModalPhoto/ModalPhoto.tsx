import React, { useState } from 'react'
import { IPhoto } from '~/components/Photo/Photo'
import './ModalPhoto.scss'
import Modal from '../Modal/Modal'

interface IModalPhoto extends IPhoto {
  onClickNext?: () => void | undefined
  onClickPrev?: () => void | undefined
  isShow: boolean
  setIsShow: (show: boolean) => void
}

enum MODE {
  VIEW,
  EDIT
}

const ModalPhoto: React.FC<IModalPhoto> = ({
  isShow,
  setIsShow,
  _id,
  name,
  description,
  image,
  thumbnail,
  onClickPrev,
  onClickNext
}) => {
  const [mode, setMode] = useState<MODE>()
  return (
    <Modal className='modal-photo' isShow={isShow} setIsShow={setIsShow}>
      <div className='modal-photo__body'>
        <div className='modal-photo__body__img'>
          <img src={image} />
        </div>
        <div className='modal-photo__body__content'>
          {mode == MODE.VIEW ? (
            <>
              <p className='title'>{name}</p>
              <div className='description'>{description}</div>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ModalPhoto
