import type { FC } from 'react'
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
  isError: boolean,
  repeatSendMessage: () => Promise<void>
}

const Chat: FC<Props> = ({chatHistory, isLoading, isError, repeatSendMessage}) => {

  return (
    <section className={styles.chat}>
        <h1 className={styles.title}><Subtitle>Hi there!</Subtitle></h1>
        <h2 className={styles.subtitle}><TitleBig>What would you like to know?</TitleBig></h2>
        <ChatMessage key={0} type={'bot'}>Use one of the most common prompts below or ask your own question</ChatMessage>
        {chatHistory.map(message => (
          <ChatMessage key={message.id} type={message.type}>{message.message}</ChatMessage>
        ))}
        {isLoading && <Icon icon='loading'/>}
        {!isLoading && isError && <>
          <button className={styles.repeat}
            onClick={repeatSendMessage}>
              <Icon icon='repeat'/>
              <Text>AI response error</Text>
          </button>
        </>}
    </section>
  )
}

export default Chat