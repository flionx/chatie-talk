export interface IResponseAi {
  choices: {
    index: number,
    message: {
      content: string,
      role: string,
    }
  }[],
  error?: {
    message: string
  }
}

const getAiResponse = async (message: string, token: string): Promise<string> => {
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout:free',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 400,
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw Error(`OpenRouter error: ${errorText}`)
    }
    const result = await response.json() as IResponseAi;
    
    const aiResponse = result?.choices?.[0]?.message?.content as string;
    if (!aiResponse) {
      if (result?.error?.message) {
        const apiError = result?.error?.message;
        if (apiError.toLocaleLowerCase().includes('credits')) {
          throw Error('Message limit has been exceeded. Please come back later');
        }
        throw Error(apiError);
      } 
      throw Error('The AI response is generated with an error')
    }

    return aiResponse;
}

export default getAiResponse