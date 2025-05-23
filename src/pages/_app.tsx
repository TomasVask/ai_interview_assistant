import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Sidebar from '@/components/Sidebar';
import { AISettings } from '@/models/aiSettings.model';
import { useState } from 'react';

const defaultSettings: AISettings = {
  systemPersonality: 'Friendly HR recruiter conducting first interview',
  promptStrategy: 'chainOfThought',
  temperature: 0.7,
  topP: 0.9,
  frequencyPenalty: 0.2,
  questionDifficulty: 'easy',
  model: 'gpt-4o',
};

export default function App({ Component, pageProps }: AppProps) {
  const [aiSettings, setAISettings] = useState<AISettings>(defaultSettings);

  return (
    <div className="flex">
      <Sidebar aiSettings={aiSettings} setAISettings={setAISettings} />
      <main className="flex-1">
        <Component {...pageProps} aiSettings={aiSettings} />
      </main>
    </div>
  );
}
