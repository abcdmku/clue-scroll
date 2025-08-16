import { useState } from 'react';
import { ClueScroll } from '../ClueScroll';

export function CipherWheelClue({goToNextClue}: {goToNextClue: () => void}) {
  const [shift, setShift] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  
  const encodedMessage = "WKLV FOXH OHDGV WR YLFWRUB";
  const correctShift = 3;
  const correctAnswer = "THISCLUEADSTOVICTORY";
  
  const caesarDecode = (text: string, shiftAmount: number) => {
    return text.split('').map(char => {
      if (char === ' ') return ' ';
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 - shiftAmount + 26) % 26) + 65);
      }
      return char;
    }).join('');
  };
  
  const decodedMessage = caesarDecode(encodedMessage, shift);
  
  const handleSubmit = () => {
    if (shift === correctShift || answer.toUpperCase().replace(/\s/g, '') === correctAnswer) {
      goToNextClue();
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  return (
    <ClueScroll>
      <div className="text-center">
        <p className="text-amber-100 text-sm mb-4 quill-font">
          Decode the Caesar cipher:
        </p>
        
        <div className="mb-4">
          <p className="text-amber-300 text-lg font-mono mb-2">
            {encodedMessage}
          </p>
          <p className="text-xs text-amber-200 quill-font">
            Encrypted message
          </p>
        </div>
        
        <div className="mb-4">
          <label className="text-amber-100 text-sm quill-font">
            Shift: {shift}
          </label>
          <input
            type="range"
            min="0"
            max="25"
            value={shift}
            onChange={(e) => setShift(parseInt(e.target.value))}
            className="w-48 mt-2 block mx-auto"
          />
        </div>
        
        <div className="mb-4 p-3 bg-amber-900/20 rounded">
          <p className="text-green-400 text-lg font-mono">
            {decodedMessage}
          </p>
          <p className="text-xs text-amber-200 quill-font mt-1">
            Decoded message
          </p>
        </div>
        
        <div className="mt-6">
          <button 
            onClick={handleSubmit}
            className={`quill-font text-amber-100 text-lg hover:text-amber-200 transition-colors cursor-pointer ${isShaking ? 'shake' : ''}`}
          >
            {shift === correctShift ? 'Continue' : 'Try Again'}
          </button>
        </div>
      </div>
    </ClueScroll>
  );
}