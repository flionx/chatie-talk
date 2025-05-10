import { useEffect, useRef, useState } from "react";
import useMicrophone from "./useMicrophone";
import type { ISendMessageProps } from "./useSendMessage";

const useInput = (handleSendMessage: ({ message, clearInput, inputFocus }: ISendMessageProps) => Promise<void>) => {
    const [message, setMessage] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const {listenedText, isListening, startListening} = useMicrophone();

    useEffect(() => {
        if (listenedText) {
            inputRef.current?.focus();
            const index = inputRef.current?.selectionStart ?? message.length;
            const newMessage = `${message.slice(0, index)} ${listenedText} ${message.slice(index)}`;
            setMessage(newMessage);
        }
    }, [listenedText])

    async function sendMessageToAI() { 
        if (!message.trim()) {
            inputRef.current?.focus();
            return;
        }

        const clearInput = () => setMessage('');
        const inputFocus = () => inputRef.current?.focus();
        handleSendMessage({message, clearInput, inputFocus})
    }

    return {
        message, setMessage, isListening, startListening,
        sendMessageToAI, inputRef
    }
}

export default useInput