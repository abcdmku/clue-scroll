import { useState } from 'react';
import { ClueScroll } from '../ClueScroll';

export function KitchenAnagramClue({goToNextClue}: {goToNextClue: () => void}) {
  const [answer, setAnswer] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const correctAnswer = 'REFRIGERATOR';
  
  const handleSubmit = () => {
    if (!answer.trim()) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
      return;
    }

    if (answer.toUpperCase().replace(/\s/g, '') === correctAnswer) {
      goToNextClue();
    } else {
      setWrongAttempts(prev => prev + 1);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  return (
    <ClueScroll>
      <div className="text-center">
        <p className="text-amber-100 text-sm mb-4 quill-font">
          Unscramble the letters to find the kitchen item:
        </p>
        
        <div className="text-amber-300 text-3xl font-bold mb-6 quill-font tracking-wider">
          GRIDF ERATOR
        </div>

        {wrongAttempts > 0 && (
          <p className="text-amber-200 text-xs mb-2 quill-font">
            Keep thinking... {wrongAttempts > 2 && "It keeps things cold!"}
          </p>
        )}

        <div className="mt-6">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            className={`w-64 px-3 py-2 text-center text-xl border-2 border-amber-700/20 bg-amber-50/20 text-amber-100 font-bold rounded focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${isShaking ? 'shake' : ''}`}
            placeholder="Enter your answer"
          />
          
          <div className="mt-4">
            <button 
              onClick={handleSubmit}
              className="quill-font text-amber-100 text-lg hover:text-amber-200 transition-colors cursor-pointer"
            >
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    </ClueScroll>
  );
}