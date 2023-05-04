import { ChangeEvent, FC, useEffect, useState } from 'react'

import s from './Counter.module.css'
import { ERRORS_STATUS } from './counter.ts'
import { Main } from './Main/Main.tsx'
import { Settings } from './Settings/Settings.tsx'

type PropsType = {
  id: number
  min: number
  max: number
}
export const Counter: FC<PropsType> = ({ id, min, max }) => {
  const [minValue, setMinValue] = useState(min)
  const [maxValue, setMaxValue] = useState(max)
  const [currentValue, setCurrentValue] = useState(minValue)
  const [status, setStatus] = useState('')

  useEffect(() => {
    const counterMinValueAsString = localStorage.getItem(`counterMinValue/${id}`)
    const counterMaxValueAsString = localStorage.getItem(`counterMaxValue/${id}`)
    const counterValueAsString = localStorage.getItem(`counterCurrentValue/${id}`)

    counterMinValueAsString && setMinValue(JSON.parse(counterMinValueAsString))
    counterMaxValueAsString && setMaxValue(JSON.parse(counterMaxValueAsString))
    counterValueAsString && setCurrentValue(JSON.parse(counterValueAsString))
  }, [])
  useEffect(() => {
    localStorage.setItem(`counterCurrentValue/${id}`, JSON.stringify(currentValue))
  }, [currentValue])

  const incrementHandler = () => currentValue < maxValue && setCurrentValue(prev => prev + 1)
  const resetHandler = () => currentValue > minValue && setCurrentValue(minValue)

  const changeCounterMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const numberToValue = Number(e.currentTarget.value)

    numberToValue >= -1 && numberToValue <= maxValue && setMinValue(numberToValue)

    if (numberToValue >= maxValue || numberToValue <= -1) {
      setStatus(ERRORS_STATUS.incorrect)
    } else {
      setStatus(ERRORS_STATUS.change)
    }
  }
  const changeCounterMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const numberToValue = Number(e.currentTarget.value)

    numberToValue >= minValue && setMaxValue(numberToValue)

    if (Number(e.currentTarget.value) <= minValue || minValue === -1) {
      setStatus(ERRORS_STATUS.incorrect)
    } else {
      setStatus(ERRORS_STATUS.change)
    }
  }

  const setNewValuesHandler = () => {
    if (status) {
      setStatus('')
      localStorage.setItem(`counterMinValue/${id}`, JSON.stringify(minValue))
      localStorage.setItem(`counterMaxValue/${id}`, JSON.stringify(maxValue))
      setCurrentValue(minValue)
    }
  }

  return (
    <div className={s.counter}>
      {!status ? (
        <Main
          minValue={minValue}
          maxValue={maxValue}
          currentValue={currentValue}
          status={status}
          setStatus={setStatus}
          incrementHandler={incrementHandler}
          resetHandler={resetHandler}
        />
      ) : (
        <Settings
          minValue={minValue}
          maxValue={maxValue}
          status={status}
          changeCounterMinValueHandler={changeCounterMinValueHandler}
          changeCounterMaxValueHandler={changeCounterMaxValueHandler}
          setNewValuesHandler={setNewValuesHandler}
        />
      )}
    </div>
  )
}
