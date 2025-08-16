import { MapClue } from './MapClue';
import { PuzzleClue } from './PuzzleClue';
import { RiddleClue } from './RiddleClue';
import { SliderPuzzleClue } from './SliderPuzzleClue';

export const Clues = ({clueIndex, attemptsLeft, setAttemptsLeft, goToNextClue}: {clueIndex: number, attemptsLeft: number, setAttemptsLeft: React.Dispatch<React.SetStateAction<number>>, goToNextClue: () => void}) => {
  switch (clueIndex) {
    case 1: return <MapClue />;
    case 2: return <SliderPuzzleClue goToNextClue={goToNextClue} />;
    case 3: return <PuzzleClue attemptsLeft={attemptsLeft} setAttemptsLeft={setAttemptsLeft} goToNextClue={goToNextClue} />;
    case 4: return <RiddleClue />;
    default:
      return null;
  }
};

export default Clues;