import React, { useState } from 'react'
import { IPhoto } from '~/components/Photo/Photo'
import './ModalPhoto.scss'
import Modal from '../Modal/Modal'
import { SvgEdit } from '~/assets/svg/SvgEdit'
import { SvgPrev } from '~/assets/svg/SvgPrev'
import { SvgNext } from '~/assets/svg/SvgNext'

interface IModalPhoto extends IPhoto {
  onClickNext?: (index: number) => Promise<void> | undefined
  onClickPrev?: (index: number) => void | undefined
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
  index,
  onClickPrev,
  onClickNext
}) => {
  const [mode, setMode] = useState<MODE>(MODE.VIEW)
  return (
    <Modal className='modal-photo' isShow={isShow} setIsShow={setIsShow}>
      <div className='modal-photo__body'>
        <div className='modal-photo__body__img'>
          <div className='edit-btn'>
            <SvgEdit />
          </div>
          <div
            className='prev-btn'
            onClick={(e) => {
              e.stopPropagation()
              if (index !== undefined && onClickPrev) onClickPrev(index)
            }}
          >
            <SvgPrev />
          </div>
          <div
            className='next-btn'
            onClick={(e) => {
              e.stopPropagation()
              if (index !== undefined && onClickNext) onClickNext(index)
            }}
          >
            <SvgNext />
          </div>
          <img src={image} />
        </div>
        <div className='modal-photo__body__content'>
          <p className='title'>{name}</p>
          <div className='description'>{description}</div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalPhoto
