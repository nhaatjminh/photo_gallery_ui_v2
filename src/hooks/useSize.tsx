import { useState, useEffect } from 'react'

export default function useSize(ref: any): { width: number; height: number } {
  const [size, setSize] = useState<{ width: number; height: number } | any>({})

  useEffect(() => {
    if (ref.current == null) return
    const observer = new ResizeObserver(([entry]) => {
      // get size of observer
      setSize(entry.contentRect)
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return size
}
