import type { FC, RefObject } from 'react'
import type { IChatMessage } from '../../types/chat'
import Subtitle from '../Subtitle/Subtitle'
import TitleBig from '../TitleBig/TitleBig'
import ChatMessage from '../ChatMessage/ChatMessage'
import styles from './index.module.css'
import Icon from '../Icon/Icon'
import Text from '../Text/Text'
interface Props {
  chatHistory: IChatMessage[],
  isLoading: boolean,
  errorResponse: {
    isError: boolean,
    message: string,
  },
  repeatSendMessage: () => Promise<void>,
  scrollBlockRef: RefObject<HTMLDivElement | null>
}

const Chat: FC<Props> = ({chatHistory, isLoading, errorResponse, repeatSendMessage, scrollBlockRef}) => {

  return (
    <section className={styles.chat}>
        <h1 className={styles.title}><Subtitle>Hi there!</Subtitle></h1>
        <h2 className={styles.subtitle}><TitleBig>What would you like to know?</TitleBig></h2>
        <ChatMessage key={0} type={'bot'}>Use one of the most common prompts below or ask your own question</ChatMessage>
        {chatHistory.map(message => (
          <ChatMessage key={message.id} type={message.type}>{message.message}</ChatMessage>
        ))}
        {isLoading && <Icon icon='loading'/>}
        {!isLoading && errorResponse.isError && <>
          <button className={styles.repeat}
            onClick={repeatSendMessage}>
              <Icon icon='repeat'/>
              <Text>{errorResponse.message}</Text>
          </button>
        </>}
        <div ref={scrollBlockRef} className={styles.scrollblock}></div>
    </section>
  )
}

export default Chat