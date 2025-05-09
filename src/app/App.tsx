import ButtonUI from '../components/ButtonUI/ButtonUI'
import Chat from '../components/Chat/Chat'
import Icon from '../components/Icon/Icon'
import InputMessage from '../components/InputMessage/InputMessage'
import './styles/index.css'
function App() {

  return (
    <div className="container">
      <main>
        <div className="top-container">
          <ButtonUI handleClick={() => {}}>
            <Icon icon='message'/>
          </ButtonUI>
        </div>
        <Chat />
        <InputMessage /> 
      </main>
    </div>
  )
}

export default App
