import React from 'react';

interface FeedbackIndicatorProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const FeedbackIndicator: React.FC<FeedbackIndicatorProps> = ({ onClick, onMouseEnter, onMouseLeave }) => (
  <div
    className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center cursor-pointer shadow-md"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}>
    <span>💡</span>
  </div>
);
