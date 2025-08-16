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

// Define clue configuration with enabled flag
export const CLUE_CONFIG = [
  { component: LivingRoomRiddleClue, name: 'Living Room Riddle', enabled: true, requiresAttempts: false },
  { component: DifficultRiddle5, name: 'Candle Riddle', enabled: true, requiresAttempts: false },
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
  const enabledClues = getEnabledClues();
  
  // Ensure clueIndex is within bounds
  if (clueIndex < 1 || clueIndex > enabledClues.length) {
    return null;
  }
  
  const clueConfig = enabledClues[clueIndex - 1];
  const ClueComponent = clueConfig.component;
  
  // Pass props based on what the component needs
  if (clueConfig.requiresAttempts) {
    return <ClueComponent attemptsLeft={attemptsLeft} setAttemptsLeft={setAttemptsLeft} goToNextClue={goToNextClue} />;
  } else if (ClueComponent === MapClue || ClueComponent === RiddleClue) {
    return <ClueComponent />;
  } else {
    return <ClueComponent goToNextClue={goToNextClue} />;
  }
};

export default Clues;