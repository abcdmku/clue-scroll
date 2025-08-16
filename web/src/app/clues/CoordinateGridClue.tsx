import { useState } from 'react';
import { ClueScroll } from '../ClueScroll';
import { ClueComponentProps } from './index';

export function CoordinateGridClue({goToNextClue}: ClueComponentProps) {
  const [selectedSquare, setSelectedSquare] = useState<{x: number, y: number} | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  
  // Target is at 7 degrees North, 3 degrees East (grid position [3, 7])
  const targetX = 3;
  const targetY = 7;
  
  const handleSquareClick = (x: number, y: number) => {
    setSelectedSquare({x, y});
    
    if (x === targetX && y === targetY) {
      setTimeout(() => {
        if (goToNextClue) {
          goToNextClue();
        }
      }, 500);
    } else {
      setAttempts(prev => prev + 1);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };
  
  const getSquareClass = (x: number, y: number) => {
    const isTarget = x === targetX && y === targetY;
    const isSelected = selectedSquare?.x === x && selectedSquare?.y === y;
    
    if (isSelected && isTarget) {
      return 'bg-green-500 border-green-600';
    } else if (isSelected) {
      return 'bg-red-500 border-red-600';
    } else if (attempts > 5 && isTarget) {
      return 'bg-yellow-500/30 border-yellow-600/50';
    } else {
      return 'bg-amber-900/20 border-amber-700/30 hover:bg-amber-800/30';
    }
  };

  return (
    <ClueScroll>
      <div className="text-center">
        <p className="text-amber-100 text-sm mb-2 quill-font">
          Navigate to the coordinates:
        </p>
        
        <div className="text-amber-300 text-lg mb-3 quill-font">
          07° North, 03° East
        </div>
        
        {attempts > 3 && (
          <p className="text-amber-200 text-xs mb-2 quill-font">
            Remember: North is up, East is right
          </p>
        )}
        
        <div className={`grid grid-cols-10 gap-0.5 w-64 mx-auto p-2 bg-amber-950/30 rounded ${isShaking ? 'shake' : ''}`}>
          {Array.from({length: 100}).map((_, idx) => {
            const x = idx % 10;
            const y = Math.floor(idx / 10);
            return (
              <button
                key={idx}
                onClick={() => handleSquareClick(x, 9 - y)}
                className={`w-6 h-6 border transition-all cursor-pointer ${getSquareClass(x, 9 - y)}`}
              />
            );
          })}
        </div>
        
        <div className="mt-3 flex justify-center items-center gap-4">
          <div className="text-amber-200 text-xs quill-font">
            N ↑
          </div>
          <div className="text-amber-200 text-xs quill-font">
            E →
          </div>
        </div>
        
        {selectedSquare && selectedSquare.x !== targetX && (
          <p className="text-red-400 text-xs mt-2 quill-font">
            Wrong location! Try again.
          </p>
        )}
      </div>
    </ClueScroll>
  );
}