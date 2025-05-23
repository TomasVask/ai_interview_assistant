import { ChatMessage } from '@/models/chatMessage.model';
import { FeedbackDisplay } from './FeedbackDisplay';

export const ChatMessageDisplay = ({ message, index }: { message: ChatMessage; index: number }) => (
  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} relative`}>
    <div
      className={`p-3 rounded-lg max-w-[80%] ${
        message.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
      } relative`}>
      <span className="font-bold mr-2">{message.role === 'user' ? 'YOU:' : 'INTERVIEWER:'}</span>
      {message.content}
      {message.role === 'user' && message.feedback && index > 1 && <FeedbackDisplay feedback={message.feedback} />}
    </div>
  </div>
);
