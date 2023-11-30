import React, { TextareaHTMLAttributes } from 'react'
import './TextArea.scss'

interface ITextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  warning?: boolean
}

const TextArea: React.FC<ITextArea> = ({ warning, ...props }) => {
  return (
    <div className={`custom-text-area } ${warning ? 'custom-text-area__warning' : ''}`}>
      <textarea
        defaultValue={props.defaultValue}
        value={props.value}
        disabled={props.disabled}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        autoComplete={props.autoComplete}
      />
    </div>
  )
}

export default TextArea
