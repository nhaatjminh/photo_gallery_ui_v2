import { createContext, useContext } from 'react'

interface IToastContextValue {
  // eslint-disable-next-line prettier/prettier
  open: (message: string) => void
  close: (id: number) => void
}

export const ToastContext = createContext<IToastContextValue | null>(null)

export const useToast = () => useContext(ToastContext)
