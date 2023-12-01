import React, { useState, useMemo, useRef, useEffect } from 'react'
import './Toast.scss'
import { ToastContext } from './ToastContext'

const useTimeout = (cb: () => void) => {
  const savedCb = useRef(cb)

  useEffect(() => {
    savedCb.current = cb
  }, [cb])

  useEffect(() => {
    const functionId = setTimeout(() => savedCb.current(), 3000)

    return () => clearTimeout(functionId)
  }, [])
}

interface IToast {
  message: string
  close: () => void
}

export const Toast: React.FC<IToast> = ({ message, close }) => {
  useTimeout(() => close())

  return (
    <div className='toast'>
      <p>{message}</p>
      <button className='close-button' onClick={close}>
        &#10005;
      </button>
    </div>
  )
}

interface IToastProvider {
  children: React.ReactElement
}

type ToastType = {
  message: string
  id: number
}

export const ToastProvider: React.FC<IToastProvider> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const openToast = (message: string) => {
    const newToast = {
      id: Date.now(),
      message: message
    }
    setToasts((pre) => [...pre, newToast])
  }

  const closeToast = (id: number) => {
    setToasts((pre) => pre.filter((toast) => toast.id !== id))
  }

  const contextValue = useMemo(
    () => ({
      open: openToast,
      close: closeToast
    }),
    []
  )

  return (
    <>
      <ToastContext.Provider value={contextValue}>
        {children}
        <div className='toasts'>
          {toasts &&
            toasts.map((toast) => <Toast key={toast.id} message={toast.message} close={() => closeToast(toast.id)} />)}
        </div>
      </ToastContext.Provider>
    </>
  )
}
