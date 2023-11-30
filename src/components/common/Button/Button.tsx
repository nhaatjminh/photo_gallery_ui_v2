import React, { ButtonHTMLAttributes } from 'react'
import './Button.scss'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<IButton> = ({ ...props }) => {
  return (
    <button
      className={`custom-button ${props.className}`}
      style={props.style}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button