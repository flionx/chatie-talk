import type { FC } from 'react'
import type { IChatMessage } from '../../types/chat'
import Subtitle from '../Subtitle/Subtitle'
import TitleBig from '../TitleBig/TitleBig'
import ChatMessage from '../ChatMessage/ChatMessage'
import styles from './index.module.css'
import Icon from '../Icon/Icon'
interface Props {
  chatHistory: IChatMessage[],
  isLoading: boolean,
}

const Chat: FC<Props> = ({chatHistory, isLoading}) => {

  return (
    <section className={styles.chat}>
        <h1 className={styles.title}><Subtitle>Hi there!</Subtitle></h1>
        <h2 className={styles.subtitle}><TitleBig>What would you like to know?</TitleBig></h2>
        <ChatMessage key={0} type={'bot'}>Use one of the most common prompts below or ask your own question</ChatMessage>
        {chatHistory.map(message => (
          <ChatMessage key={message.id} type={message.type}>{message.message}</ChatMessage>
        ))}
        {isLoading && <Icon icon='loading'/>}
    </section>
  )
}

export default Chat