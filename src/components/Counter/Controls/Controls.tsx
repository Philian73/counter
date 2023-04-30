import { FC, ReactNode } from 'react'

import s from './Controls.module.css'

type PropsType = {
  children: ReactNode
}
export const Controls: FC<PropsType> = ({ children }) => {
  return <div className={s.counterControl}>{children}</div>
}
