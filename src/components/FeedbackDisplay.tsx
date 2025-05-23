import { Feedback } from '@/models/feedback.model';
import { FeedbackIndicator } from './FeedbackIndicator';
import { FeedbackTooltip } from './FeedbackTooltip';
import { LoadingIndicator } from './LoadingIndicator';
import { useState } from 'react';

export const FeedbackDisplay = ({ feedback }: { feedback: Feedback }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute -top-2 -right-2">
      {feedback.loading ? (
        <LoadingIndicator />
      ) : feedback.tips && feedback.tips.length > 0 ? (
        <div className="relative">
          <FeedbackIndicator
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          />
          <FeedbackTooltip feedback={feedback} isOpen={isOpen} />
        </div>
      ) : null}
    </div>
  );
};
