import type { FC } from 'react'
import type { IWithChildren } from '../../types/react'
import styles from './index.module.css'

const TitleBig: FC<IWithChildren> = ({children}) => {
  return (
    <span className={styles.title}>
      {children}
    </span>
  )
}

export default TitleBig