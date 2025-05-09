import Subtitle from '../Subtitle/Subtitle'
import TitleBig from '../TitleBig/TitleBig'
import ChatMessage from '../ChatMessage/ChatMessage'
import { useState } from 'react'
import type { IChatMessage } from '../../types/chat'

const Chat = () => {
    const [chatHistory, setChatHistory] = useState<IChatMessage>([])

  return (
    <section className='chat'>
        <h1 className='title'><Subtitle>Hi there!</Subtitle></h1>
        <h2 className='subtitle'><TitleBig>What would you like to know?</TitleBig></h2>
        <ChatMessage type='bot'>Use one of the most common prompts below or ask your own question</ChatMessage>
        <ChatMessage type='user'>Use one of the most common prompts below or ask your own question</ChatMessage>
    </section>
  )
}

export default Chat