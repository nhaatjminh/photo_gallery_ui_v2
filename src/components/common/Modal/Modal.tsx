import React, { useEffect, useRef } from 'react'

import './Modal.scss'
import { SvgClose } from '~/assets/svg/SvgClose'

interface IModal {
  isShow?: boolean | string
  className?: string
  setIsShow?: (show: boolean) => void
  backgroundColorOverlay?: string
  classNameContainer?: string
  isHiddenClickOutside?: boolean
  resetField?: () => void
  handleDiscard?: any
  children: React.ReactNode
}

const Modal: React.FC<IModal> = ({ children, isShow, className, setIsShow, backgroundColorOverlay, resetField }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overflowBody = document.body.style.overflow
    if (isShow) {
      document.body.style.overflow = 'hidden'
    } else {
      if (overflowBody !== 'hidden') document.body.style.overflow = 'unset'
    }

    return () => {
      if (overflowBody !== 'hidden') document.body.style.overflow = 'unset'
    }
  }, [isShow])

  useEffect(() => {
    if (isShow) {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          if (setIsShow) setIsShow(false)
          if (resetField) resetField()
        }
      }
      document.addEventListener('click', handleClickOutside)
      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    }
  }, [ref, isShow, setIsShow])

  return (
    <div
      className={isShow ? 'modal modal-close modal--show' : 'modal-close modal'}
      style={{ backgroundColor: backgroundColorOverlay }}
    >
      <div className={`modal__container modal-close__container ${className}`} ref={ref}>
        <div className='modal-close__close' onClick={() => setIsShow && setIsShow(false)}>
          <SvgClose />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
