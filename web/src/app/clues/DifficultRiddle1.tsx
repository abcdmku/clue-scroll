import { useState } from 'react';
import { ClueScroll } from '../ClueScroll';

export function DifficultRiddle1({goToNextClue}: {goToNextClue: () => void}) {
  const [answer, setAnswer] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const validAnswers = ['CLOCK', 'WATCH', 'TIMEPIECE'];
  
  const handleSubmit = () => {
    if (!answer.trim()) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
      return;
    }

    const normalizedAnswer = answer.toUpperCase().replace(/\s/g, '');
    if (validAnswers.includes(normalizedAnswer)) {
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
        <div className="text-amber-200 text-base leading-relaxed mb-6 quill-font">
          My hands move but I cannot clap,<br/>
          My face shows all but cannot see,<br/>
        </div>

        {wrongAttempts > 3 && (
          <p className="text-amber-300 text-xs mb-2 quill-font italic">
            Time is of the essence...
          </p>
        )}

        <div className="mt-6">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            className={`w-64 px-3 py-2 text-center text-xl border-2 border-amber-700/20 bg-amber-50/20 text-amber-100 font-bold rounded focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${isShaking ? 'shake' : ''}`}
            placeholder="What am I?"
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