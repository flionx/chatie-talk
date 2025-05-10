import { type FC } from "react"
import type { TSendMessageFunc } from "../../hooks/useSendMessage"
import styles from './index.module.css'
import ButtonUI from "../ButtonUI/ButtonUI"
import Icon from "../Icon/Icon"
import useInput from "../../hooks/useInput"
interface Props {
    handleSendMessage: TSendMessageFunc,
}
const InputMessage:FC<Props> = ({handleSendMessage}) => {
    const {message, setMessage, isListening, startListening, sendMessageToAI, inputRef} = useInput(handleSendMessage)

  return (
    <form className={styles.block} onSubmit={e => {
        e.preventDefault();
        sendMessageToAI()
    }}>
        <button 
            className={styles.micro} 
            type="button"
            onClick={() => startListening("en-US")}>
            <Icon icon="microphone"/>
        </button>
        <div className={styles.send}>
            <ButtonUI handleClick={sendMessageToAI}>
                <Icon icon="arrow-right" />
            </ButtonUI>
        </div>
        <input 
            className={styles.input} 
            placeholder={isListening ? 'Speak...' : 'Ask whatever you want'}
            type="text" 
            value={message}
            ref={inputRef}
            onChange={e => setMessage(e.target.value)}
        />
    </form>
  )
}

export default InputMessage