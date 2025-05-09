import type { FC } from "react"
import styles from './index.module.css'
import ButtonUI from "../ButtonUI/ButtonUI"
import Icon from "../Icon/Icon"

const InputMessage:FC = () => {
  return (
    <div className={styles.block}>
        <button className={styles.micro}>
            <Icon icon="microphone"/>
        </button>
        <div className={styles.send}>
            <ButtonUI handleClick={() => {}}>
                <Icon icon="arrow-right" />
            </ButtonUI>
        </div>
        <input className={styles.input} type="text" placeholder="Ask whatever you want"/>
    </div>
  )
}

export default InputMessage