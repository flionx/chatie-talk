import { useCallback, useRef, useState } from "react";
import type { IChatMessage, TMessageAuthor } from "../types/chat";
import type { TSetState } from "../types/react";
import { Message } from "../models/message";
export interface ISendMessageProps {
    message: string,
    clearInput: VoidFunction,
    inputFocus?: VoidFunction
}
export type TSendMessageFunc = ({ message, clearInput, inputFocus }: ISendMessageProps) => Promise<void>

const useSendMessage = () => {
    const [chatHistory, setChatHistory] = useState<IChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const scrollBlockRef = useRef<HTMLDivElement>(null)
  
    const addToChat = useCallback((type: TMessageAuthor, message: string) => {
        if (!message.trim()) return;
        const newMessage = new Message(type, message);
        setChatHistory(history => [...history, newMessage]);
        scrollBlockRef.current?.scrollIntoView({behavior: "smooth"})
    }, []);

    const fetchMessage = useCallback(async (message: string) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({message}),
            })    
            if (!response.ok) {
                setIsError(true)
            }
            const messageAi = await response.json();
            addToChat("bot", messageAi);
        } catch (error) {
            console.log(error);
            setIsError(true);
            await new Promise((res) => setTimeout(res, 1000));
        } finally {
            setIsLoading(false);
        }
    }, [addToChat])

    const repeatSendMessage = useCallback(async () => {
        const lastMessage = [...chatHistory].reverse().find(msg => msg.type === 'user');        
        await fetchMessage(lastMessage?.message!)
    }, [chatHistory, fetchMessage]);
  
    
    const sendMessage = useCallback(async (
        {message, clearInput, inputFocus}: ISendMessageProps
    ) => {
        addToChat("user", message);
        clearInput();
        if (inputFocus) inputFocus();
        await fetchMessage(message)
    }, [addToChat, fetchMessage])
    
    const callIsLoading = useCallback<TSetState<boolean>>((value) => setIsLoading(value), []);
    
    const clearChatHistory = useCallback(() => {
        setChatHistory([]);
        setIsError(false);
        setIsLoading(false);
    }, []);
    
    return {
        chatHistory, clearChatHistory, isLoading, 
        setIsLoading: callIsLoading, isError, 
        sendMessage, repeatSendMessage, scrollBlockRef
    }
}

export default useSendMessage
