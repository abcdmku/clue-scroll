import { ClueScroll } from '../ClueScroll';
import { ClueComponentProps } from './index';

export function RiddleClue({}: ClueComponentProps) {
  return (
    <ClueScroll>
      <div className="text-center">
        <p className="text-amber-100 text-lg leading-relaxed tracking-wide quill-font">
          Even the seers say this clue goes<br />
          right over their heads
        </p>
      </div>
      
      {/* Hidden solve button in bottom right - RiddleClue has no interaction so just skip */}
      <button
        onClick={() => {
          // RiddleClue has no solve condition, just skip to next
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