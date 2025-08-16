import Clues, { getEnabledClues } from './clues';
import { useState, useEffect } from 'react';

export function App() {
  const [currentClueIndex, setCurrentClueIndex] = useState(1);
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [completedClues, setCompletedClues] = useState<Set<number>>(new Set());
  const totalClues = getEnabledClues().length;

  // Track the highest unlocked clue (always at least 1)
  const highestUnlockedClue = Math.max(1, Math.min(completedClues.size + 1, totalClues));

  const goToPreviousClue = () => {
    // Only go to clues that are unlocked (completed or currently available)
    setCurrentClueIndex(prev => {
      if (prev <= 1) return prev; // Don't go below first clue
      return prev - 1;
    });
  };

  const goToNextClue = () => {
    // Mark current clue as completed
    setCompletedClues(prev => new Set([...prev, currentClueIndex]));
    
    // Navigate to next clue if available
    setCurrentClueIndex(prev => {
      const nextIndex = prev + 1;
      // If there are more clues, go to the next one
      if (nextIndex <= totalClues) {
        return nextIndex;
      }
      // Otherwise stay on current (last) clue
      return prev;
    });
  };
  return (
    <div className="app-container relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #2d1810 0%, #1a0f0a 25%, #0f0704 50%, #1a0f0a 75%, #2d1810 100%)',
      margin: '0 auto'
    }}>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center relative">

          <Clues clueIndex={currentClueIndex} attemptsLeft={attemptsLeft} setAttemptsLeft={setAttemptsLeft} goToNextClue={goToNextClue} />
          

          {/* Clue progress display - only show when more than 1 clue is unlocked */}
          <div className="mt-6 mb-4">
            {highestUnlockedClue > 1 && (
              <span className="quill-font text-2xl">
                Clue {currentClueIndex} of {highestUnlockedClue}
              </span>
            )}
          </div>

          {/* Navigation arrows - only show when at least 2 clues are available */}
          {highestUnlockedClue >= 2 && (
            <div className="flex gap-8 mt-4">
              <button
                onClick={goToPreviousClue}
                disabled={currentClueIndex === 1}
                className={`osrs-arrow-button ${currentClueIndex === 1 ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <div className="osrs-arrow-left">
                  ◀
                </div>
              </button>
              <button
                onClick={() => {
                  if (currentClueIndex < highestUnlockedClue) {
                    setCurrentClueIndex(prev => prev + 1);
                  }
                }}
                disabled={currentClueIndex === highestUnlockedClue}
                className={`osrs-arrow-button ${currentClueIndex === highestUnlockedClue ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <div className="osrs-arrow-right">
                  ▶
                </div>
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default App;