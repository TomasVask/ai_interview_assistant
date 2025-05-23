import React from 'react';
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { AISettings } from '@/models/aiSettings.model';

interface SidebarContentProps {
  aiSettings: AISettings;
  setAISettings: React.Dispatch<React.SetStateAction<AISettings>>;
}

export default function SidebarContent({ aiSettings, setAISettings }: SidebarContentProps) {
  const handleTextChange = (field: keyof AISettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAISettings((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSelectChange = (field: keyof AISettings) => (e: SelectChangeEvent<string>) => {
    setAISettings((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSliderChange = (field: keyof AISettings) => (_: Event, value: number | number[]) => {
    setAISettings((prev) => ({
      ...prev,
      [field]: value as number,
    }));
  };

  return (
    <div>
      <Toolbar />
      <Divider />
      <form className="flex flex-col px-6 py-2">
        <TextField
          label="System Personality"
          value={aiSettings.systemPersonality}
          onChange={handleTextChange('systemPersonality')}
          fullWidth
          margin="normal"
        />
        <FormControl variant="standard" fullWidth margin="normal">
          <InputLabel id="prompt-strategy-label">Prompt Strategy</InputLabel>
          <Select
            labelId="prompt-strategy-label"
            value={aiSettings.promptStrategy}
            onChange={handleSelectChange('promptStrategy')}>
            <MenuItem value="chainOfThought">Chain-of-Thought</MenuItem>
            <MenuItem value="fewShot">Few-Shot</MenuItem>
            <MenuItem value="selfRefinement">Self-Refinement</MenuItem>
            <MenuItem value="generatedKnowledge">Generated Knowledge</MenuItem>
            <MenuItem value="maieutic">Maieutic Prompting</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" fullWidth margin="normal">
          <InputLabel id="question-difficulty-label">Question Difficulty</InputLabel>
          <Select
            labelId="question-difficulty-label"
            value={aiSettings.questionDifficulty}
            onChange={handleSelectChange('questionDifficulty')}>
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>

        <Typography className="pt-2">Temperature</Typography>
        <Slider
          value={aiSettings.temperature}
          min={0}
          max={1}
          step={0.1}
          marks
          valueLabelDisplay="auto"
          onChange={handleSliderChange('temperature')}
        />

        <Typography className="pt-2">Top-P</Typography>
        <Slider
          value={aiSettings.topP}
          min={0}
          max={1}
          step={0.1}
          marks
          valueLabelDisplay="auto"
          onChange={handleSliderChange('topP')}
        />

        <Typography className="pt-2">Frequency Penalty</Typography>
        <Slider
          value={aiSettings.frequencyPenalty}
          min={0}
          max={2}
          step={0.1}
          marks
          valueLabelDisplay="auto"
          onChange={handleSliderChange('frequencyPenalty')}
        />

        <FormControl variant="standard" fullWidth margin="normal" className="mt-10!">
          <InputLabel id="llm-model-label">Pick LLM model</InputLabel>
          <Select labelId="llm-model-label" value={aiSettings.model} onChange={handleSelectChange('model')}>
            <MenuItem value="gpt-4o">gpt-4o</MenuItem>
            <MenuItem value="gemini-1.5-flash">gemini-1.5-flash</MenuItem>
            <MenuItem value="claude-3-5-sonnet-latest">claude-3-5-sonnet-latest</MenuItem>
          </Select>
        </FormControl>
      </form>
      <Divider />
    </div>
  );
}
