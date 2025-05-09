import { type FC } from 'react'
import styles from './index.module.css'
interface Props {
    icon: 'message' | 'microphone' | 'arrow-right'
}
const Icon: FC<Props> = ({icon}) => {
  return (
    <span className={styles[icon]}></span>
  )
}

export default Icon