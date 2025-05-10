import type { FC } from 'react'
import styles from './index.module.css'
import type { IWithChildren } from '../../types/react'
interface Props extends IWithChildren {
    handleClick: VoidFunction
}

const ButtonUI: FC<Props> = ({children, handleClick}) => {
  return (
    <button 
      type='button'
      className={styles.button} 
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default ButtonUI