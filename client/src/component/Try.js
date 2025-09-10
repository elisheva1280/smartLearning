import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Try = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  
  const prompt = 'Help me learn English grammar basics';

  const makeRequest = async () => {
    setLoading(true);
    console.log('Testing direct OpenAI connection...');
    
    try {
      const result = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: prompt
        }],
        max_tokens: 150
      }, {
        headers: {
          'Authorization': `Bearer YOUR_API_KEY_HERE`,
          'Content-Type': 'application/json'
        }
      });
      
      if (result.data?.choices?.[0]?.message?.content) {
        setResponse(result.data.choices[0].message.content);
      } else {
        setResponse('No response received from AI');
      }
    } catch (error) {
      console.error('Error details:', error);
      if (error.code === 'ERR_NETWORK') {
        setResponse('Network error - possibly blocked by NetFree or firewall');
      } else if (error.response?.status === 401) {
        setResponse('Invalid API key');
      } else if (error.response?.status === 429) {
        setResponse('Rate limit exceeded');
      } else {
        setResponse(`Error: ${error.response?.data?.error?.message || error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    makeRequest();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>AI Response Test</h2>
      <p><strong>Prompt:</strong> {prompt}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Try;
