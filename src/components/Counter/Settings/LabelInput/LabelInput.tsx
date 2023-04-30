import { ChangeEvent, FC, KeyboardEvent } from 'react'

import { ERRORS_STATUS } from '../../counter.ts'

import s from './LabelInput.module.css'

type PropsType = {
  name: string
  value: number
  status: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const LabelInput: FC<PropsType> = ({ name, value, status, onChange }) => {
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const regex = /[.,]/

    if (regex.test(e.key)) {
      e.preventDefault()
    }
  }
  const inputClasses = status === ERRORS_STATUS.incorrect ? s.counterSettingsInputError : ''

  return (
    <label>
      <span className={s.counterSettingsText}>{name}</span>
      <input
        className={inputClasses}
        type="number"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDownHandler}
      />
    </label>
  )
}
