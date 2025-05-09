import type { FC } from 'react'
import type { IChatMessage } from '../../types/chat'
import Subtitle from '../Subtitle/Subtitle'
import TitleBig from '../TitleBig/TitleBig'
import ChatMessage from '../ChatMessage/ChatMessage'
import styles from './index.module.css'
interface Props {
  chatHistory: IChatMessage[],
}

const Chat: FC<Props> = ({chatHistory}) => {

  return (
    <section className={styles.chat}>
        <h1 className={styles.title}><Subtitle>Hi there!</Subtitle></h1>
        <h2 className={styles.subtitle}><TitleBig>What would you like to know?</TitleBig></h2>
        {chatHistory.map(message => (
          <ChatMessage key={message.id} type={message.type}>{message.message}</ChatMessage>
        ))}
    </section>
  )
}

export default Chat