import { Feedback } from "./feedback.model";

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    feedback?: Feedback
}