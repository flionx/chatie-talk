import type { FC } from "react"
import styles from './index.module.css'
import Text from "../Text/Text"
import type { TMessageAuthor } from "../../types/chat"
import type { IWithChildren } from "../../types/react"
import ReactMarkdown from 'react-markdown'

interface Props extends IWithChildren {
    type: TMessageAuthor,
}
const ChatMessage: FC<Props> = ({type, children}) => {
  return (
    <div className={`${styles.message} ${styles[type]}`}>
        <Text>
          <ReactMarkdown>
            {children as string}
          </ReactMarkdown>
        </Text>
    </div>
  )
}

export default ChatMessage