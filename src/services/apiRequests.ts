import { AISettings } from "@/models/aiSettings.model";

export const sendChatMessage = async (
    messages: { role: string; content: string }[],
    systemPrompt: string,
    aiSettings: AISettings
) => {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            messages,
            systemPrompt,
            temperature: aiSettings.temperature,
            top_p: aiSettings.topP,
            frequency_penalty: aiSettings.frequencyPenalty,
            model: aiSettings.model,
        }),
    });
    return await response.json();
};

export const requestFeedback = async (
    userMessage: string,
    lastInterviewerQuestion: string,
    systemPrompt: string
) => {
    const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: userMessage,
            interviewerQuestion: lastInterviewerQuestion,
            context: systemPrompt,
        }),
    });
    return await response.json();
};