import { MapClue } from './MapClue';
import { PuzzleClue } from './PuzzleClue';
import { RiddleClue } from './RiddleClue';

export const Clues = ({clueIndex}: {clueIndex: number}) => {
  switch (clueIndex) {
    case 1: return <MapClue />;
    case 2: return <RiddleClue />;
    case 3: return <PuzzleClue />;
    default:
      return null;
  }
};

export default Clues;