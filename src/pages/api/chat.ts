import Anthropic from '@anthropic-ai/sdk';
import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { messages, systemPrompt, temperature, top_p, frequency_penalty, model } = req.body;

  let responseContent;

  try {
    if (model === 'gpt-4o') {
      const response = await openai.chat.completions.create({
        model,
        temperature,
        max_tokens: 800,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        top_p,
        frequency_penalty
      });
      responseContent = response.choices[0].message.content;
    } else if (model === 'gemini-1.5-flash') {
      const gemini = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', systemInstruction: systemPrompt });
      const formattedMessages: Content[] = messages.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'assistant' ? 'model' : msg.role,
        parts: [{ text: msg.content }],
      }));

      const response = await gemini.generateContent({
        contents: formattedMessages,
        generationConfig: {
          temperature,
          topP: top_p,
          maxOutputTokens: 800
        },
      });
      responseContent = response.response.text()
    } else if (model === 'claude-3-5-sonnet-latest') {
      const response = await anthropic.messages.create({
        model,
        max_tokens: 800,
        messages: [...messages],
        system: systemPrompt,
        temperature,
        top_p,
      });
      const contentBlock = response.content[0];
      responseContent = contentBlock.type === 'text' ? contentBlock.text : '[Non-text response]'
    } else {
      return res.status(400).json({ error: 'Unknown model' });
    }

    res.status(200).json({ content: responseContent });
  } catch (error) {
    console.log('Error fetching model response:', error);
    res.status(500).json({ error: 'Failed to fetch model response' });
  }
}