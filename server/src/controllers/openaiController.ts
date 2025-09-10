import { Request, Response } from 'express';
import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const generateResponse = async (req: Request, res: Response) => {
    console.log('OpenAI endpoint called with prompt:', req.body);
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const result = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: prompt
            }],
            max_tokens: 200,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ response: result.data.choices[0].message.content });
    } catch (error: any) {
        console.error('OpenAI API Error Details:');
        console.error('Status:', error.response?.status);
        console.error('Data:', error.response?.data);
        console.error('Message:', error.message);
        
        let errorMessage = 'Failed to generate response';
        
        if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
            errorMessage = 'Network connection blocked - possibly by NetFree or firewall';
        } else if (error.response?.status === 401) {
            errorMessage = 'Invalid API key';
        } else if (error.response?.status === 429) {
            errorMessage = 'Rate limit exceeded';
        } else if (error.response?.data?.error?.message) {
            errorMessage = error.response.data.error.message;
        }
        
        res.status(500).json({ error: errorMessage });
    }
};