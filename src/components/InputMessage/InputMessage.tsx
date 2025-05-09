import { useEffect, useRef, useState, type FC } from "react"
import styles from './index.module.css'
import ButtonUI from "../ButtonUI/ButtonUI"
import Icon from "../Icon/Icon"
import useMicrophone from "../../hooks/useMicrophone"
interface Props {
    handleSend: (message: string) => void,
}
const InputMessage:FC<Props> = ({handleSend}) => {
    const [message, setMessage] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const {listenedText, isListening, startListening} = useMicrophone();

    useEffect(() => {
        if (listenedText) {
            inputRef.current?.focus();
            const index = inputRef.current?.selectionStart ?? message.length;
            const newMessage = `${message.slice(0, index)} ${listenedText} ${message.slice(index)}`;
            setMessage(newMessage);
        }
    }, [listenedText])

    function sendMessage() {        
        handleSend(message);
        setMessage(c => c = '');
        inputRef.current?.focus();
    }

  return (
    <form className={styles.block} onSubmit={e => {
        e.preventDefault();
        sendMessage()
    }}>
        <button className={styles.micro} onClick={e => {
            e.preventDefault();
            startListening("en-US");
        }}>
            <Icon icon="microphone"/>
        </button>
        <div className={styles.send}>
            <ButtonUI handleClick={sendMessage}>
                <Icon icon="arrow-right" />
            </ButtonUI>
        </div>
        <input 
            className={styles.input} 
            type="text" 
            placeholder={isListening ? 'Speak...' : 'Ask whatever you want'}
            value={message}
            ref={inputRef}
            onChange={e => setMessage(e.target.value)}
        />
    </form>
  )
}

export default InputMessage