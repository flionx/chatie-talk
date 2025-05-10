import { useCallback, useState } from 'react'
import { Message } from '../models/message'
import ButtonUI from '../components/ButtonUI/ButtonUI'
import InputMessage from '../components/InputMessage/InputMessage'
import Chat from '../components/Chat/Chat'
import Icon from '../components/Icon/Icon'
import type { IChatMessage, TMessageAuthor } from '../types/chat'
import './styles/index.css'
import type { TSetState } from '../types/react'

function App() {
  const [chatHistory, setChatHistory] = useState<IChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addToChat = useCallback((type: TMessageAuthor, message: string) => {
    if (!message.trim()) return;
    const newMessage = new Message(type, message);
    setChatHistory(history => [...history, newMessage]);
  }, []);

  const callIsLoading = useCallback<TSetState<boolean>>((value) => setIsLoading(value), []);

  return (
    <div className="container">
      <main>
        <div className="top-container">
          <ButtonUI handleClick={() => setChatHistory([])}>
            <Icon icon='message'/>
          </ButtonUI>
        </div>
        <Chat chatHistory={chatHistory} isLoading={isLoading}/>
        <InputMessage handleAddToChat={addToChat} setIsLoading={callIsLoading}/> 
      </main>
    </div>
  )
}

export default App
