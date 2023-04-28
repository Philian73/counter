import { FC } from 'react'

type PropsType = {
  name: string
  onClick: () => void
  disabled?: boolean
  className?: string
}
export const Button: FC<PropsType> = ({ name, onClick, disabled, className }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {name}
    </button>
  )
}
