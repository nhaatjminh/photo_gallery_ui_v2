import React from 'react'
import './Loader.scss'

interface ILoader {
  className?: string
  small?: boolean
}

const Loader: React.FC<ILoader> = ({ className, small }) => {
  return (
    <div className={`loader ${className ? className : ''}`}>
      <svg viewBox='25 25 50 50' style={{ width: small ? '20px' : undefined }}>
        <circle cx='50' cy='50' r='20'></circle>
      </svg>
    </div>
  )
}

export default Loader
