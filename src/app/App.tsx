import { useState } from 'react'
import ButtonUI from '../components/ButtonUI/ButtonUI'
import InputMessage from '../components/InputMessage/InputMessage'
import Chat from '../components/Chat/Chat'
import Icon from '../components/Icon/Icon'
import { Message } from '../models/message'
import type { IChatMessage } from '../types/chat'
import './styles/index.css'

function App() {
  const [chatHistory, setChatHistory] = useState<IChatMessage[]>([])
  function sendToChat(message: string) {
    if (!message.trim()) return;
    const newMessage = new Message('user', message);
    setChatHistory(history => [...history, newMessage]);
  }

  return (
    <div className="container">
      <main>
        <div className="top-container">
          <ButtonUI handleClick={() => setChatHistory([])}>
            <Icon icon='message'/>
          </ButtonUI>
        </div>
        <Chat chatHistory={chatHistory}/>
        <InputMessage handleSend={sendToChat}/> 
      </main>
    </div>
  )
}

export default App
