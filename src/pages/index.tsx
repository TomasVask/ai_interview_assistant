import { useEffect, useRef, useState } from 'react';
import { promptStrategies } from '../prompts/systemPrompts';
import { AISettings } from '@/models/aiSettings.model';
import { ChatMessage } from '@/models/chatMessage.model';
import { requestFeedback, sendChatMessage } from '@/services/apiRequests';
import { Feedback } from '@/models/feedback.model';
import { ChatMessageDisplay } from '@/components/ChatMessageDisplay';

interface HomeProps {
  aiSettings: AISettings;
}

export default function Home({ aiSettings }: Readonly<HomeProps>) {
  const [userPrompt, setUserPrompt] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generatePrompt = promptStrategies[aiSettings.promptStrategy];
    setSystemPrompt(generatePrompt(aiSettings.systemPersonality, aiSettings.questionDifficulty));
  }, [aiSettings, chat]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSend = async () => {
    if (!userPrompt.trim()) {
      return;
    }

    setChat((prev) => addInitialUserMessage(prev, userPrompt));

    setUserPrompt('');
    const apiReadyMessagesWithoutFeedback = chat.map(({ role, content }) => ({ role, content }));
    const messages = [...apiReadyMessagesWithoutFeedback, { role: 'user', content: userPrompt }];

    try {
      const chatData = await sendChatMessage(messages, systemPrompt, aiSettings);
      setChat((prev) => addAssistantMessage(prev, chatData.content));

      const lastInterviewerQuestion = getLastInterviewerQuestion(chat);
      const feedbackData = await requestFeedback(userPrompt, lastInterviewerQuestion, systemPrompt);
      setChat((prev) => updateMessageWithFeedback(prev, feedbackData));
    } catch (error) {
      setChat((prev) => clearLoadingStatekOnError(prev));
      console.error('Failed to fetch feedback:', error);
    }
  };

  const addInitialUserMessage = (chat: ChatMessage[], content: string): ChatMessage[] => [
    ...chat,
    {
      role: 'user',
      content,
      feedback: {
        loading: true,
        tips: [],
        motivationalMessage: '',
        comprehensiveness: '',
        clarity: '',
        relevance: '',
      },
    },
  ];

  const addAssistantMessage = (chat: ChatMessage[], content: string): ChatMessage[] => [
    ...chat,
    { role: 'assistant', content },
  ];

  const updateMessageWithFeedback = (chat: ChatMessage[], feedbackData: Feedback): ChatMessage[] => {
    return chat.map((msg) => {
      if (msg.role === 'user' && msg.feedback?.loading) {
        return {
          ...msg,
          feedback: {
            loading: false,
            tips: feedbackData.tips ?? [],
            motivationalMessage: feedbackData.motivationalMessage ?? '',
            comprehensiveness: feedbackData.comprehensiveness ?? '',
            clarity: feedbackData.clarity ?? '',
            relevance: feedbackData.relevance ?? '',
          },
        };
      }
      return msg;
    });
  };

  const getLastInterviewerQuestion = (chat: ChatMessage[]): string => {
    return chat.filter((msg) => msg.role === 'assistant').pop()?.content || 'No previous question';
  };

  const clearLoadingStatekOnError = (chat: ChatMessage[]): ChatMessage[] => {
    return chat.map((msg) => {
      if (msg.role === 'user' && msg.feedback?.loading) {
        return {
          ...msg,
          feedback: undefined,
        };
      }
      return msg;
    });
  };

  const hasResponded = chat.length > 0;

  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      <div className={hasResponded ? 'flex justify-center pt-8' : 'flex items-center justify-center pt-20'}>
        <h1 className="text-2xl font-normal text-center">
          Let&apos;s simulate your interview! Describe the role you are applying for
        </h1>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <div
          ref={chatContainerRef}
          className="w-full max-w-3xl flex-1 overflow-y-auto flex flex-col gap-4 pt-2 mt-8 mb-4 px-3"
          style={{ maxHeight: '60vh', minHeight: '120px' }}>
          {chat.map((message, index) => (
            <ChatMessageDisplay key={index} message={message} index={index} />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col items-center mb-8">
        <textarea
          className="w-full max-w-3xl border rounded-lg p-2"
          placeholder="Type your message here..."
          rows={4}
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.blur();
              handleSend();
            }
          }}
        />
      </div>
    </div>
  );
}
