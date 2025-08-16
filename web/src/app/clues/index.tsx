import { MapClue } from './MapClue';
import { PuzzleClue } from './PuzzleClue';
import { RiddleClue } from './RiddleClue';
import { SliderPuzzleClue } from './SliderPuzzleClue';
import { KitchenAnagramClue } from './KitchenAnagramClue';
import { LivingRoomRiddleClue } from './LivingRoomRiddleClue';
import { DifficultRiddle1 } from './DifficultRiddle1';
import { DifficultRiddle5 } from './DifficultRiddle5';
import { CipherWheelClue } from './CipherWheelClue';
import { LightBoxClue } from './LightBoxClue';
import { CoordinateGridClue } from './CoordinateGridClue';
import { RuneMatchClue } from './RuneMatchClue';
import React, { useState, useEffect } from 'react';
import { ClueScroll } from '../ClueScroll';

// Shared interface for all clue components
export interface ClueComponentProps {
  attemptsLeft?: number;
  setAttemptsLeft?: React.Dispatch<React.SetStateAction<number>>;
  goToNextClue?: () => void;
}

// Type for clue component
type ClueComponent = React.ComponentType<ClueComponentProps>;

// Interface for clue configuration
interface ClueConfigItem {
  component: ClueComponent;
  name: string;
  enabled: boolean;
  requiresAttempts: boolean;
}

// Define clue configuration with enabled flag
export const CLUE_CONFIG: ClueConfigItem[] = [
  { component: DifficultRiddle5, name: 'Candle Riddle', enabled: true, requiresAttempts: false },
  { component: LivingRoomRiddleClue, name: 'Living Room Riddle', enabled: true, requiresAttempts: false },
  { component: MapClue, name: 'Map Clue', enabled: true, requiresAttempts: false },
  { component: SliderPuzzleClue, name: 'Slider Puzzle', enabled: true, requiresAttempts: false },
  { component: PuzzleClue, name: 'Character Puzzle', enabled: true, requiresAttempts: true },
  { component: LightBoxClue, name: 'Light Box Puzzle', enabled: true, requiresAttempts: false },
  { component: RiddleClue, name: 'Simple Riddle', enabled: true, requiresAttempts: false },
//  { component: KitchenAnagramClue, name: 'Kitchen Anagram', enabled: true, requiresAttempts: false },
//  { component: DifficultRiddle1, name: 'Clock Riddle', enabled: true, requiresAttempts: false },
//  { component: CipherWheelClue, name: 'Cipher Wheel', enabled: true, requiresAttempts: false },
//  { component: CoordinateGridClue, name: 'Coordinate Grid', enabled: true, requiresAttempts: false },
//  { component: RuneMatchClue, name: 'Rune Memory Match', enabled: true, requiresAttempts: false },
];

// Get only enabled clues
export const getEnabledClues = () => CLUE_CONFIG.filter(clue => clue.enabled);

export const Clues = ({clueIndex, attemptsLeft, setAttemptsLeft, goToNextClue}: {clueIndex: number, attemptsLeft: number, setAttemptsLeft: React.Dispatch<React.SetStateAction<number>>, goToNextClue: () => void}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [completedClueName, setCompletedClueName] = useState('');
  const [showSolveButton, setShowSolveButton] = useState(false);
  const [successClueIndex, setSuccessClueIndex] = useState<number | null>(null);
  const enabledClues = getEnabledClues();
  
  // Reset success state when clue changes
  useEffect(() => {
    if (successClueIndex !== null && clueIndex !== successClueIndex) {
      // We've moved to the next clue, hide success
      setShowSuccess(false);
      setSuccessClueIndex(null);
    }
  }, [clueIndex, successClueIndex]);
  
  // Ensure clueIndex is within bounds
  if (clueIndex < 1 || clueIndex > enabledClues.length) {
    return null;
  }
  
  const clueConfig = enabledClues[clueIndex - 1];
  const ClueComponent = clueConfig.component;
  const isLastClue = clueIndex === enabledClues.length;
  
  // Wrap goToNextClue to trigger success message
  const handleClueComplete = () => {
    if (isLastClue) {
      // Don't advance if this is the last clue
      return;
    }
    setCompletedClueName(clueConfig.name);
    setShowSuccess(true);
    setSuccessClueIndex(clueIndex);
    // Show success for 4 seconds then move to next clue
    setTimeout(() => {
      goToNextClue();
    }, 4000);
  };
  
  // If showing success message, display it
  if (showSuccess) {
    return (
      <ClueScroll>
        <div className="text-center">
          <div className="mb-6">
            <h2 className="text-green-400 text-3xl font-bold quill-font mb-4">
              ✓ Correct!
            </h2>
            <p className="text-amber-100 text-xl quill-font">
              {completedClueName} completed
            </p>
          </div>
          <div className="text-amber-200 text-lg quill-font animate-pulse">
            Loading next clue...
          </div>
        </div>
      </ClueScroll>
    );
  }
  
  // Pass all props - components will use what they need
  return (
    <>
      <ClueComponent 
        attemptsLeft={attemptsLeft} 
        setAttemptsLeft={setAttemptsLeft} 
        goToNextClue={handleClueComplete} 
      />
      
      {/* Hidden button in bottom left to toggle solve button */}
      <button
        onClick={() => setShowSolveButton(!showSolveButton)}
        className="fixed bottom-4 left-4 w-4 h-4 bg-transparent opacity-0 hover:opacity-10 transition-opacity"
        style={{ zIndex: 9999 }}
        title="Toggle Solve"
      >
      </button>
      
      {/* Auto-solve button in bottom right (only shown when toggled) */}
      {showSolveButton && (
        <button
          onClick={handleClueComplete}
          disabled={isLastClue}
          className={`fixed bottom-4 right-4 w-4 h-4 transition-opacity ${
            isLastClue 
              ? 'bg-gray-500 opacity-30 cursor-not-allowed' 
              : 'bg-green-500 opacity-50 hover:opacity-100'
          }`}
          style={{ zIndex: 9999 }}
          title={isLastClue ? "Last Clue" : "Auto Solve"}
        >
        </button>
      )}
    </>
  );
};

export default Clues;