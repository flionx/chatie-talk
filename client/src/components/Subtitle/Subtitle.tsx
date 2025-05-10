import type { FC } from 'react'
import type { IWithChildren } from '../../types/react'
import styles from './index.module.css'

const Subtitle: FC<IWithChildren> = ({children}) => {
  return (
    <span className={styles.subtitle}>
        {children}
    </span>
  )
}

export default Subtitle