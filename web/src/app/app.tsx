import Clues, { getEnabledClues } from './clues';
import { useState, useEffect } from 'react';

export function App() {
  const [currentClueIndex, setCurrentClueIndex] = useState(1);
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [completedClues, setCompletedClues] = useState<Set<number>>(new Set());
  const [showSuccess, setShowSuccess] = useState(false);
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
    // Mark current clue as completed and show success
    setCompletedClues(prev => new Set([...prev, currentClueIndex]));
    setShowSuccess(true);
    
    // Auto-navigate to next clue if available
    setTimeout(() => {
      setShowSuccess(false);
      setCurrentClueIndex(prev => {
        const nextIndex = prev + 1;
        // If there are more clues, go to the next one
        if (nextIndex <= totalClues) {
          return nextIndex;
        }
        // Otherwise stay on current (last) clue
        return prev;
      });
    }, 2000); // Show success for 2 seconds before moving
  };
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundColor: '#1a0f0a'
    }}>
      {/* OSRS-style dark brown background with more visible blur */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #2d1810 0%, #1a0f0a 25%, #0f0704 50%, #1a0f0a 75%, #2d1810 100%)',
        filter: 'blur(80px)',
        transform: 'scale(1.1)'
      }}></div>
      
      {/* Additional blur layers for depth */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(92, 51, 23, 0.6) 0%, transparent 50%),
          radial-gradient(circle at 80% 50%, rgba(92, 51, 23, 0.6) 0%, transparent 50%),
          radial-gradient(circle at 50% 20%, rgba(61, 33, 15, 0.5) 0%, transparent 50%),
          radial-gradient(circle at 50% 80%, rgba(61, 33, 15, 0.5) 0%, transparent 50%)
        `,
        filter: 'blur(100px)'
      }}></div>
      
      {/* Animated dark green mystical fog */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-pulse" style={{
          background: 'radial-gradient(circle, rgba(29, 78, 29, 0.5) 0%, transparent 60%)',
          filter: 'blur(120px)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(19, 52, 19, 0.6) 0%, transparent 60%)',
          filter: 'blur(100px)',
          animation: 'float 10s ease-in-out infinite reverse'
        }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(34, 68, 34, 0.4) 0%, transparent 70%)',
          filter: 'blur(90px)',
          animation: 'float 12s ease-in-out infinite',
          animationDelay: '2s'
        }}></div>
      </div>
      
      {/* Dark vignette effect with brown tint */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at center, transparent 0%, rgba(26, 15, 10, 0.5) 60%, rgba(10, 6, 4, 0.95) 100%)'
      }}></div>
      
      {/* Warm torch light effects */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full animate-pulse" style={{
        background: 'radial-gradient(circle, rgba(255, 147, 41, 0.3) 0%, transparent 70%)',
        filter: 'blur(60px)'
      }}></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full animate-pulse" style={{
        background: 'radial-gradient(circle, rgba(255, 147, 41, 0.3) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animationDelay: '1s'
      }}></div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center relative">

          <Clues clueIndex={currentClueIndex} attemptsLeft={attemptsLeft} setAttemptsLeft={setAttemptsLeft} goToNextClue={goToNextClue} />
          
          {/* Success overlay */}
          {showSuccess && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-green-900/90 border-4 border-green-400 rounded-lg p-8 success-overlay">
                <p className="text-green-300 text-4xl font-bold quill-font">
                  ✓ CORRECT!
                </p>
                <p className="text-green-200 text-lg mt-2 quill-font">
                  Well done, adventurer!
                </p>
              </div>
            </div>
          )}

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