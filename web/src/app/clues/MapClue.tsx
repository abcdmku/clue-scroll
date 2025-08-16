import { ClueScroll } from '../ClueScroll';
import { ClueComponentProps } from './index';

export function MapClue({}: ClueComponentProps) {
  return (
    <ClueScroll>
      <div className="relative" style={{ width: '100%' }}>
        <img 
          src="/clue.png" 
          alt="Map Clue" 
          className="mx-auto"
          style={{ 
            imageRendering: 'pixelated',
            width: '65%',  // 390px / 600px ≈ 65%
            marginBottom: '5%',
            marginLeft: '3%'
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