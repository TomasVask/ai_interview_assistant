import { PromptStrategyKey } from "./promptStrategy.model";
import { QuestionDifficulty } from "./questionDifficulty.model";

export interface AISettings {
    systemPersonality: string;
    temperature: number;
    topP: number;
    frequencyPenalty: number;
    promptStrategy: PromptStrategyKey;
    questionDifficulty: QuestionDifficulty;
    model: string;
}