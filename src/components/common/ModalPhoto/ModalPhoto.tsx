import React, { useState, useLayoutEffect } from 'react'
import { IPhoto } from '~/components/Photo/Photo'
import './ModalPhoto.scss'
import Modal from '../Modal/Modal'
import { SvgEdit } from '~/assets/svg/SvgEdit'
import { SvgPrev } from '~/assets/svg/SvgPrev'
import { SvgNext } from '~/assets/svg/SvgNext'
import Input from '../Input/Input'
import TextArea from '../TextArea/TextArea'
import Button from '../Button/Button'
import photosAPI from '~/services/api/PhotoApi'
import Loader from '../Loader/Loader'

interface IModalPhoto extends IPhoto {
  onClickNext?: (index: number) => Promise<void> | undefined
  onClickPrev?: (index: number) => void | undefined
  onUpdateSuccess?: (photo: IPhoto) => void
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
  onClickNext,
  onUpdateSuccess
}) => {
  const [mode, setMode] = useState<MODE>(MODE.VIEW)
  const [_name, set_Name] = useState('')
  const [_description, set_Description] = useState('')
  const [updating, setUpdating] = useState(false)

  useLayoutEffect(() => {
    set_Name(name)
  }, [name])

  useLayoutEffect(() => {
    set_Description(description)
  }, [description])

  const handleEditPhoto = async () => {
    if (!_name) {
      alert('Name is required')
      return
    }
    setUpdating(true)
    const data = await photosAPI.editPhoto({
      _id: _id,
      name: _name,
      description: _description
    })
    setUpdating(false)
    console.log(data)
    if (!data || !data.result) {
      alert('Something went wrong! Please try again later')
      return
    }
    if (onUpdateSuccess && data.result) onUpdateSuccess({ ...data.result, index: index })
    setMode(MODE.VIEW)
  }

  return (
    <Modal className='modal-photo' isShow={isShow} setIsShow={setIsShow}>
      <div className='modal-photo__body'>
        {mode == MODE.VIEW ? (
          <>
            <div className='modal-photo__body__img'>
              <div
                className='edit-btn'
                onClick={(e) => {
                  e.stopPropagation()
                  setMode(MODE.EDIT)
                }}
              >
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
          </>
        ) : (
          <div className='modal-photo__body__form'>
            <p className='title'>Name</p>
            <Input
              value={_name}
              onChange={(e) => {
                e.preventDefault()
                set_Name(e.target.value)
              }}
            />
            <p className='title'>Description</p>
            <TextArea
              value={_description}
              onChange={(e) => {
                e.preventDefault()
                set_Description(e.target.value)
              }}
            />
            <div className='group-btn'>
              <Button
                className='cancel-btn'
                onClick={(e) => {
                  e.stopPropagation()
                  setMode(MODE.VIEW)
                }}
                disabled={updating}
              >
                Cancel
              </Button>
              <Button disabled={updating} onClick={handleEditPhoto}>
                {updating ? <Loader small /> : 'Save'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default ModalPhoto
