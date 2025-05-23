import { Feedback } from '@/models/feedback.model';

export const FeedbackTooltip = ({ feedback, isOpen }: { feedback: Feedback; isOpen: boolean }) => {
  return (
    <div className="relative">
      <div
        className={`absolute flex flex-col text-left right-7 -top-1 mt-1 w-72 bg-white rounded-md border border-gray-100 shadow-xl p-3 z-50 
          ${isOpen ? 'visible opacity-100' : 'invisible opacity-0 md:group-hover:visible md:group-hover:opacity-100'} 
          transition-opacity duration-150`}>
        <p className="font-semibold text-xs mb-1">{feedback.motivationalMessage}</p>
        <p className="text-xs mb-1">
          Comprehensiveness: <b>{feedback.comprehensiveness}</b>
        </p>
        <p className="text-xs mb-1">
          Clarity: <b>{feedback.clarity}</b>
        </p>
        <p className="text-xs mb-1">
          Relevance: <b>{feedback.relevance}</b>
        </p>
        <p className="font-semibold text-xs mb-1 pt-2">Some tips:</p>
        <ul className="text-xs">
          {feedback.tips.map((tip, i) => (
            <li key={i} className="mb-1 pl-1">
              • {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
