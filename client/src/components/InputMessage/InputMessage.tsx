import { useEffect, useRef, useState, type FC } from "react"
import styles from './index.module.css'
import ButtonUI from "../ButtonUI/ButtonUI"
import Icon from "../Icon/Icon"
import useMicrophone from "../../hooks/useMicrophone"
import type { TMessageAuthor } from "../../types/chat"
import type { TSetState } from "../../types/react"
interface Props {
    handleAddToChat: (type: TMessageAuthor, message: string) => void,
    setIsLoading: TSetState<boolean>,
}
const InputMessage:FC<Props> = ({handleAddToChat, setIsLoading}) => {
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

    async function sendMessageToAI() {    
        handleAddToChat("user", message);
        setMessage('');
        inputRef.current?.focus();
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({message}),
            })    
            if (!response.ok) {
                throw Error('Error')
            }
            const messageAi = await response.json();
            handleAddToChat("bot", messageAi);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    }

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