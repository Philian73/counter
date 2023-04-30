import { ChangeEvent, FC } from 'react'

import { Button } from '../../Button/Button.tsx'
import { Controls } from '../Controls/Controls.tsx'
import { BUTTONS_NAME, ERRORS_STATUS } from '../counter.ts'
import { Display } from '../Display/Display.tsx'

import { LabelInput } from './LabelInput/LabelInput.tsx'
import s from './Settings.module.css'

type PropsType = {
  minValue: number
  maxValue: number
  status: string
  changeCounterMinValueHandler: (e: ChangeEvent<HTMLInputElement>) => void
  changeCounterMaxValueHandler: (e: ChangeEvent<HTMLInputElement>) => void
  setNewValuesHandler: () => void
}
export const Settings: FC<PropsType> = ({
  minValue,
  maxValue,
  status,
  changeCounterMinValueHandler,
  changeCounterMaxValueHandler,
  setNewValuesHandler,
}) => {
  const errorClasses = status === ERRORS_STATUS.incorrect ? s.counterTextError : ''
  const disabledSetCondition = minValue >= maxValue || status !== ERRORS_STATUS.change

  return (
    <>
      <Display>
        <span className={errorClasses}>{status}</span>
        <LabelInput
          name={'Min value'}
          value={minValue}
          status={status}
          onChange={changeCounterMinValueHandler}
        />
        <LabelInput
          name={'Max value'}
          value={maxValue}
          status={status}
          onChange={changeCounterMaxValueHandler}
        />
      </Display>
      <Controls>
        <Button
          className={s.counterSettingsBtn}
          name={BUTTONS_NAME.set}
          onClick={setNewValuesHandler}
          disabled={disabledSetCondition}
        />
      </Controls>
    </>
  )
}
