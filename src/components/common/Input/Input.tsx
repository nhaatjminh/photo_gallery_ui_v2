import React, { InputHTMLAttributes } from 'react'
import './Input.scss'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  warning?: boolean
}

const Input: React.FC<IInput> = ({ warning, ...props }) => {
  return (
    <div
      className={`custom-input ${props.className ? props.className : ''} ${warning ? 'custom-input__warning' : ''}`}
      style={{ width: `${props.width}`, height: `${props.height}` }}
    >
      <input
        defaultValue={props.defaultValue}
        value={props.value}
        disabled={props.disabled}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        type={props.type}
        step={props.step}
        autoComplete={props.autoComplete}
      />
    </div>
  )
}

export default Input
