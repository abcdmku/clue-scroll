import { useState, useEffect } from 'react';
import { ClueScroll } from '../ClueScroll';

export function RuneMatchClue({goToNextClue}: {goToNextClue: () => void}) {
  const runes = ['🔥', '💧', '🌍', '💨', '⚡', '🌙'];
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerInput, setPlayerInput] = useState<string[]>([]);
  const [showSequence, setShowSequence] = useState(true);
  const [canInput, setCanInput] = useState(false);
  const [round, setRound] = useState(1);
  
  useEffect(() => {
    generateSequence();
  }, [round]);
  
  const generateSequence = () => {
    const newSequence = [];
    for (let i = 0; i < round + 2; i++) {
      newSequence.push(runes[Math.floor(Math.random() * runes.length)]);
    }
    setSequence(newSequence);
    setPlayerInput([]);
    setShowSequence(true);
    setCanInput(false);
    
    setTimeout(() => {
      setShowSequence(false);
      setCanInput(true);
    }, 2000 + (round * 500));
  };
  
  const handleRuneClick = (rune: string) => {
    if (!canInput) return;
    
    const newInput = [...playerInput, rune];
    setPlayerInput(newInput);
    
    // Check if wrong
    if (newInput[newInput.length - 1] !== sequence[newInput.length - 1]) {
      setCanInput(false);
      setTimeout(() => {
        setPlayerInput([]);
        generateSequence();
      }, 1000);
      return;
    }
    
    // Check if complete
    if (newInput.length === sequence.length) {
      if (round === 3) {
        setTimeout(() => goToNextClue(), 1000);
      } else {
        setRound(round + 1);
      }
    }
  };

  return (
    <ClueScroll>
      <div className="text-center">
        <p className="text-amber-100 text-sm mb-4 quill-font">
          Memory Test - Round {round} of 3
        </p>
        
        <div className="mb-4">
          <p className="text-amber-200 text-xs quill-font">
            {showSequence ? 'Memorize the sequence!' : 'Repeat the sequence!'}
          </p>
        </div>
        
        {showSequence && (
          <div className="flex justify-center gap-2 mb-4 p-3 bg-amber-900/30 rounded">
            {sequence.map((rune, idx) => (
              <div
                key={idx}
                className="text-3xl animate-pulse"
                style={{animationDelay: `${idx * 0.2}s`}}
              >
                {rune}
              </div>
            ))}
          </div>
        )}
        
        {!showSequence && (
          <div className="flex justify-center gap-2 mb-4 p-3 bg-amber-900/30 rounded min-h-[60px]">
            {playerInput.map((rune, idx) => (
              <div key={idx} className="text-3xl">
                {rune}
              </div>
            ))}
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-2 w-48 mx-auto">
          {runes.map((rune) => (
            <button
              key={rune}
              onClick={() => handleRuneClick(rune)}
              disabled={!canInput}
              className={`text-2xl p-3 border-2 border-amber-700/30 bg-amber-900/20 rounded transition-all ${
                canInput ? 'hover:bg-amber-800/30 cursor-pointer' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              {rune}
            </button>
          ))}
        </div>
        
        {playerInput.length > 0 && playerInput[playerInput.length - 1] !== sequence[playerInput.length - 1] && (
          <p className="text-red-400 text-sm mt-2 quill-font">
            Wrong! Try again...
          </p>
        )}
      </div>
    </ClueScroll>
  );
}