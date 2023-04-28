import { FC, useState } from 'react'

import { Button } from '../Button/Button.tsx'

import s from './Counter.module.css'

type PropsType = {
  min: number
  max: number
}
export const Counter: FC<PropsType> = ({ min, max }) => {
  const [counterValue, setCounterValue] = useState(min)

  const incrementHandler = () => counterValue < max && setCounterValue(counterValue + 1)
  const resetHandler = () => counterValue > min && setCounterValue(min)

  const textErrorClasses =
    `${s.counterText}` + `${counterValue === max ? ' ' + s.counterTextError : ''}`

  return (
    <div className={s.counter}>
      <div className={s.counterDisplay}>
        <span className={textErrorClasses}>{counterValue}</span>
      </div>
      <div className={s.counterControl}>
        <Button
          className={s.counterBtn}
          name="inc"
          onClick={incrementHandler}
          disabled={counterValue === max}
        />
        <Button
          className={s.counterBtn}
          name="reset"
          onClick={resetHandler}
          disabled={counterValue === min}
        />
      </div>
    </div>
  )
}
