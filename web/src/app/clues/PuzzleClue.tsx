import { useState } from 'react';
import { ClueScroll } from '../ClueScroll';

export function PuzzleClue() {
    const [answer, setAnswer] = useState('');
  return (
    <ClueScroll>
      <div className="text-center">
        <p className="text-amber-100 text-lg leading-relaxed tracking-wide quill-font">
          Enter the correct character<br />to solve this clue.
        </p>
         <div className="mt-6">
          <input
            type="text"
            maxLength={1}
            value={answer}
            onChange={(e) => setAnswer(e.target.value.toUpperCase())}
            className="w-12 h-12 text-center text-2xl border-2 border-amber-700/20 bg-amber-50/20 text-amber-100 font-bold rounded focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            placeholder=""
          />
        </div>
      </div>
    </ClueScroll>
  );
}