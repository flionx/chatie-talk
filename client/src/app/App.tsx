import ButtonUI from '../components/ButtonUI/ButtonUI'
import InputMessage from '../components/InputMessage/InputMessage'
import Chat from '../components/Chat/Chat'
import Icon from '../components/Icon/Icon'
import useSendMessage from '../hooks/useSendMessage'
import './styles/index.css'

function App() {
  const {chatHistory, clearChatHistory, isLoading, isError, sendMessage, repeatSendMessage} = useSendMessage();
  return (
    <main>
      <div className="top-container">
        <ButtonUI handleClick={clearChatHistory}>
          <Icon icon='message'/>
        </ButtonUI>
      </div>
      <Chat chatHistory={chatHistory} 
        isLoading={isLoading} 
        isError={isError}
        repeatSendMessage={repeatSendMessage}
      />
      <InputMessage handleSendMessage={sendMessage} /> 
    </main>
  )
}

export default App
