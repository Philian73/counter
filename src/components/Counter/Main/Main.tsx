import { FC } from 'react'

import { Button } from '../../Button/Button.tsx'
import { Controls } from '../Controls/Controls.tsx'
import { BUTTONS_NAME, ERRORS_STATUS } from '../counter.ts'
import { Display } from '../Display/Display.tsx'

import s from './Main.module.css'

type PropsType = {
  minValue: number
  maxValue: number
  currentValue: number
  status: string
  setStatus: (status: string) => void
  incrementHandler: () => void
  resetHandler: () => void
}
export const Main: FC<PropsType> = ({
  minValue,
  maxValue,
  currentValue,
  status,
  setStatus,
  incrementHandler,
  resetHandler,
}) => {
  const setHandler = () => !status && setStatus(ERRORS_STATUS.change)

  const disabledButtonCondition = (value: number) => currentValue === value || !!status

  const textErrorClasses =
    s.counterText + `${currentValue === maxValue ? ' ' + s.counterTextError : ''}`

  return (
    <>
      <Display>
        <span className={textErrorClasses}>{currentValue}</span>
      </Display>
      <Controls>
        <Button
          name={BUTTONS_NAME.inc}
          onClick={incrementHandler}
          disabled={disabledButtonCondition(maxValue)}
        />
        <Button
          name={BUTTONS_NAME.reset}
          onClick={resetHandler}
          disabled={disabledButtonCondition(minValue)}
        />
        <Button name={BUTTONS_NAME.set} onClick={setHandler} />
      </Controls>
    </>
  )
}
