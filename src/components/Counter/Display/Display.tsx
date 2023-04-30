import { FC, ReactNode } from 'react'

import s from './Display.module.css'

type PropsType = {
  children: ReactNode
}
export const Display: FC<PropsType> = ({ children }) => {
  return <div className={s.counterDisplay}>{children}</div>
}
