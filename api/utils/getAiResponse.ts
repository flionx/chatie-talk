const getAiResponse = async (message: string, token: string): Promise<string> => {
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-exp:free',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw Error(`OpenRouter error: ${errorText}`)
    }
    const result = await response.json();
    const aiResponse = result.choices[0].message.content as string;
    if (!aiResponse) {
      throw Error('AI response error');
    }

    return aiResponse;
}

export default getAiResponse