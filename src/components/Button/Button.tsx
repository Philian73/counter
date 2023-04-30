import { FC } from 'react'

import s from './Button.module.css'

type PropsType = {
  name: string
  onClick: () => void
  disabled?: boolean
  className?: string
}
export const Button: FC<PropsType> = ({ name, onClick, disabled, className }) => {
  return (
    <button
      className={`${s.btn}` + (className ? ' ' + className : '')}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  )
}
