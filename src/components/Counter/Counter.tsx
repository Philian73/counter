import { ChangeEvent, FC, useEffect, useState } from 'react'

import { Button } from '../Button/Button.tsx'

import s from './Counter.module.css'

type PropsType = {
  id: number
  min: number
  max: number
}
export const Counter: FC<PropsType> = ({ id, min, max }) => {
  const [counterMinValue, setCounterMinValue] = useState(min)
  const [counterMaxValue, setCounterMaxValue] = useState(max)
  const [counterValue, setCounterValue] = useState(counterMinValue)
  const [status, setStatus] = useState('')

  useEffect(() => {
    const counterMinValueAsString = localStorage.getItem(`counterMinValue/${id}`)
    const counterMaxValueAsString = localStorage.getItem(`counterMaxValue/${id}`)

    counterMinValueAsString && setCounterMinValue(JSON.parse(counterMinValueAsString))
    counterMaxValueAsString && setCounterMaxValue(JSON.parse(counterMaxValueAsString))
  }, [])
  useEffect(() => {
    const counterValueAsString = localStorage.getItem(`counterCurrentValue/${id}`)

    counterValueAsString && setCounterValue(JSON.parse(counterValueAsString))
  }, [])
  useEffect(() => {
    localStorage.setItem(`counterCurrentValue/${id}`, JSON.stringify(counterValue))
  }, [counterValue])

  const incrementHandler = () => counterValue < counterMaxValue && setCounterValue(counterValue + 1)
  const resetHandler = () => counterValue > counterMinValue && setCounterValue(counterMinValue)

  const changeCounterMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCounterMinValue(Number(e.currentTarget.value))
    if (Number(e.currentTarget.value) >= counterMaxValue) {
      setStatus('incorrect value')
    } else {
      setStatus('set value pls')
    }
  }
  const changeCounterMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCounterMaxValue(Number(e.currentTarget.value))
    if (Number(e.currentTarget.value) <= counterMinValue) {
      setStatus('incorrect value')
    } else {
      setStatus('set value pls')
    }
  }

  const setNewValuesHandler = () => {
    if (status) {
      setStatus('')
      localStorage.setItem(`counterMinValue/${id}`, JSON.stringify(counterMinValue))
      localStorage.setItem(`counterMaxValue/${id}`, JSON.stringify(counterMaxValue))
      setCounterValue(counterMinValue)
    }
  }

  const textErrorClasses = status
    ? s.counterText + `${counterMinValue >= counterMaxValue ? ' ' + s.counterTextError : ''}`
    : s.counterText + `${counterValue === counterMaxValue ? ' ' + s.counterTextError : ''}`

  return (
    <div className={s.test}>
      <div className={s.counter}>
        <div className={s.counterDisplay}>
          {!status && <span className={textErrorClasses}>{counterValue}</span>}
          {status && <span className={textErrorClasses}>{status}</span>}
        </div>
        <div className={s.counterControl}>
          <Button
            className={s.counterBtn}
            name="inc"
            onClick={incrementHandler}
            disabled={counterValue === counterMaxValue || !!status}
          />
          <Button
            className={s.counterBtn}
            name="reset"
            onClick={resetHandler}
            disabled={counterValue === counterMinValue || !!status}
          />
        </div>
      </div>

      <div className={s.counter}>
        <div className={s.counterDisplay}>
          <div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="number"
                value={counterMinValue}
                onChange={changeCounterMinValueHandler}
              />
            </div>
            <div>
              <input
                type="number"
                value={counterMaxValue}
                onChange={changeCounterMaxValueHandler}
              />
            </div>
          </div>
        </div>
        <div className={s.counterControl}>
          <Button
            className={s.counterBtn}
            name="set"
            onClick={setNewValuesHandler}
            disabled={counterMinValue >= counterMaxValue}
          />
        </div>
      </div>
    </div>
  )
}
