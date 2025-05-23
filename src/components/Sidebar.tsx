import React from 'react';
import { AISettings } from '@/models/aiSettings.model';
import SidebarWrapper from './SidebarWrapper';
import SidebarContent from './SidebarContent';

interface SidebarProps {
  aiSettings: AISettings;
  setAISettings: React.Dispatch<React.SetStateAction<AISettings>>;
  window?: () => Window;
}

export default function Sidebar({ aiSettings, setAISettings, window }: Readonly<SidebarProps>) {
  return (
    <SidebarWrapper
      drawerContent={<SidebarContent aiSettings={aiSettings} setAISettings={setAISettings} />}
      window={window}
    />
  );
}
