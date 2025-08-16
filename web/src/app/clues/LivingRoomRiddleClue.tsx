import { useState } from 'react';
import { ClueScroll } from '../ClueScroll';

export function LivingRoomRiddleClue({goToNextClue}: {goToNextClue: () => void}) {
  const [answer, setAnswer] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const validAnswers = ['COUCH', 'SOFA', 'CHAIR', 'ARMCHAIR', 'RECLINER'];
  
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
        <div className="text-amber-200 text-lg leading-relaxed mb-6 quill-font">
          I have four legs but never walk,<br/>
          A back but no spine.<br/>
        </div>

        {wrongAttempts > 0 && (
          <p className="text-amber-300 text-xs mb-2 quill-font">
            {wrongAttempts > 2 ? "Think about furniture..." : "Try again..."}
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
        
        {/* Hidden solve button in bottom right */}
        <button
          onClick={() => {
            setAnswer('COUCH');
            setTimeout(() => goToNextClue(), 100);
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