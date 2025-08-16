import { ClueScroll } from '../ClueScroll';

export function MapClue() {
  return (
    <ClueScroll>
      <div className="relative">
        <img 
          src="/clue.png" 
          alt="Map Clue" 
          className="w-[390px] mx-auto pb-4 ps-3"
          style={{ 
            imageRendering: 'pixelated'
          }}
        />
      </div>
    </ClueScroll>
  );
}