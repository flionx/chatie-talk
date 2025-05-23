import { useState } from 'react'
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    length: number;
    [index: number]: SpeechRecognitionResult;   
}

interface SpeechRecognitionResult {
    readonly length: number;
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface ISpeechRecognition {
  new(): ISpeechRecognitionInstance;
}

interface ISpeechRecognitionInstance {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onspeechend: () => void;
  onend: () => void;
}

const useMicrophone = () => {
    const [listenedText, setListenedText] = useState('');
    const [isListening, setIsListening] = useState(false);

    function startListening(language: 'en-US' | 'ru-RU') {
        const SpeechRecognition: ISpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('SpeechRecognition is not supported in this browser.');
        }
    
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = language;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
    
        recognition.start();
        setIsListening(true);

        recognition.onresult = function(event: SpeechRecognitionEvent) {
            const text = event.results[0][0].transcript;
            console.log(text);
            setListenedText(text)
        }

        recognition.onspeechend = function() {
            recognition.stop();
            setIsListening(false);
        }
        recognition.onend = function() {
            setIsListening(false);
        }
    }
    return {listenedText, isListening, startListening}
}

export default useMicrophone