import type { FC } from 'react'
import type { IWithChildren } from '../../types/react'
import styles from './index.module.css'

const Text: FC<IWithChildren> = ({children}) => {
  return (
    <span className={styles.text}>
        {children}
    </span>
  )
}

export default Text