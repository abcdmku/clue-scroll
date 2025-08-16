import { useState } from 'react';
import { ClueScroll } from '../ClueScroll';
import { ClueComponentProps } from './index';

export function PuzzleClue({attemptsLeft = 3, setAttemptsLeft, goToNextClue}: ClueComponentProps) {
    const [answer, setAnswer] = useState('');
    const [isShaking, setIsShaking] = useState(false);
    const [isError, setIsError] = useState(false);
    const correctAnswer = 'K'; // The answer is H (for "over their heads")

    const handleContinue = () => {
      if (!answer.trim()) {
        // No character entered - shake
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 600);
        return;
      }

      if (answer !== correctAnswer) {
        // Wrong answer - show error and shake, decrease attempts
        if (setAttemptsLeft) {
          setAttemptsLeft(prev => prev - 1);
        }
        setIsError(true);
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
          setIsError(false);
        }, 2000);
        return;
      }

      // Correct answer - go to next clue
      if (goToNextClue) {
        goToNextClue();
      }
    };
  return (
    <ClueScroll>
      <div className="text-center">
        <p className="text-amber-300 text-sm mt-2 quill-font">
          You have {attemptsLeft} attempts left
        </p>
         <div className="mt-6">
          <input
            type="text"
            maxLength={1}
            value={answer}
            onChange={(e) => setAnswer(e.target.value.toUpperCase())}
            className={`w-12 h-12 text-center text-2xl border-2 border-amber-700/20 bg-amber-50/20 text-amber-100 font-bold rounded focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${isShaking ? 'shake' : ''} ${isError ? 'input-error' : ''}`}
            placeholder=""
          />
          <div className="mt-4">
            <button 
              onClick={handleContinue}
              className="quill-font text-amber-100 text-lg hover:text-amber-800 transition-colors cursor-pointer"
            >
              Continue...
            </button>
          </div>
        </div>
        
        {/* Hidden solve button in bottom right */}
        <button
          onClick={() => {
            setAnswer('K');
            setTimeout(() => handleContinue(), 100);
          }}
          className="fixed bottom-4 right-4 w-16 h-16 bg-transparent opacity-0 hover:opacity-100 transition-opacity"
          style={{ zIndex: 9999 }}
          title="Solve"
        >
        </button>
      </div>
    </ClueScroll>
  );
}