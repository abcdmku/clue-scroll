import { ClueScroll } from '../ClueScroll';
import { ClueComponentProps } from './index';

export function MapClue({}: ClueComponentProps) {
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
      
      {/* Hidden solve button in bottom right - MapClue has no interaction so just skip */}
      <button
        onClick={() => {
          // MapClue has no solve condition, just skip to next
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
        }}
        className="fixed bottom-4 right-4 w-16 h-16 bg-transparent opacity-0 hover:opacity-100 transition-opacity"
        style={{ zIndex: 9999 }}
        title="Skip"
      >
      </button>
    </ClueScroll>
  );
}