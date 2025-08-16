import { useState, useEffect } from 'react';
import { ClueScroll } from '../ClueScroll';

export function SliderPuzzleClue({goToNextClue}: {goToNextClue: () => void}) {
  // Initialize puzzle with numbers 1-15 and one empty space (represented as 0)
  const [tiles, setTiles] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showPattern, setShowPattern] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingTiles, setAnimatingTiles] = useState<{[key: number]: {fromIndex: number, toIndex: number}}>({});

  // Shuffle the puzzle on component mount
  useEffect(() => {
    shufflePuzzle();
  }, []);

  // Check if puzzle is solved
  useEffect(() => {
    const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    if (tiles.length > 0 && tiles.every((tile, index) => tile === correctOrder[index])) {
      setIsComplete(true);
      setTimeout(() => {
        setShowPattern(true);
        setTimeout(() => {
          goToNextClue();
        }, 5000);
      }, 1500);
    }
  }, [tiles, goToNextClue]);

  const shufflePuzzle = () => {
    // Start with solved state
    const newTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    
    // Perform random valid moves to shuffle
    for (let i = 0; i < 1000; i++) {
      const emptyIndex = newTiles.indexOf(0);
      const possibleMoves = getValidMoves(emptyIndex);
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      
      // Swap empty space with random valid tile
      [newTiles[emptyIndex], newTiles[randomMove]] = [newTiles[randomMove], newTiles[emptyIndex]];
    }
    
    setTiles(newTiles);
    setIsComplete(false);
  };

  const getValidMoves = (emptyIndex: number) => {
    const moves = [];
    const row = Math.floor(emptyIndex / 4);
    const col = emptyIndex % 4;

    // Up
    if (row > 0) moves.push(emptyIndex - 4);
    // Down  
    if (row < 3) moves.push(emptyIndex + 4);
    // Left
    if (col > 0) moves.push(emptyIndex - 1);
    // Right
    if (col < 3) moves.push(emptyIndex + 1);

    return moves;
  };

  const getTransform = (tileValue: number, currentIndex: number) => {
    if (tileValue === 0) return 'translate(0, 0)';
    
    const animatingTile = animatingTiles[tileValue];
    if (animatingTile) {
      const fromRow = Math.floor(animatingTile.fromIndex / 4);
      const fromCol = animatingTile.fromIndex % 4;
      const toRow = Math.floor(animatingTile.toIndex / 4);
      const toCol = animatingTile.toIndex % 4;
      
      const deltaX = (toCol - fromCol) * 68; // 64px tile + 4px gap
      const deltaY = (toRow - fromRow) * 68;
      
      return `translate(${deltaX}px, ${deltaY}px)`;
    }
    
    return 'translate(0, 0)';
  };

  const animateMove = async (oldTiles: number[], newTiles: number[]) => {
    setIsAnimating(true);
    
    // Calculate which tiles need to animate
    const animations: {[key: number]: {fromIndex: number, toIndex: number}} = {};
    
    for (let i = 0; i < oldTiles.length; i++) {
      const tileValue = oldTiles[i];
      if (tileValue !== 0) {
        const newIndex = newTiles.indexOf(tileValue);
        if (newIndex !== i) {
          animations[tileValue] = { fromIndex: i, toIndex: newIndex };
        }
      }
    }
    
    setAnimatingTiles(animations);
    
    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, 150));
    
    setTiles(newTiles);
    setAnimatingTiles({});
    setIsAnimating(false);
  };

  const handleTileClick = async (clickedIndex: number) => {
    if (isComplete || isAnimating) return;

    const emptyIndex = tiles.indexOf(0);
    const clickedRow = Math.floor(clickedIndex / 4);
    const clickedCol = clickedIndex % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;

    // Check if clicked tile is in same row or column as empty space
    if (clickedRow === emptyRow) {
      // Same row - slide horizontally
      const newTiles = [...tiles];
      if (clickedCol < emptyCol) {
        // Slide tiles right (empty moves left)
        for (let col = emptyCol; col > clickedCol; col--) {
          const currentIndex = clickedRow * 4 + col;
          const prevIndex = clickedRow * 4 + (col - 1);
          [newTiles[currentIndex], newTiles[prevIndex]] = [newTiles[prevIndex], newTiles[currentIndex]];
        }
      } else {
        // Slide tiles left (empty moves right)
        for (let col = emptyCol; col < clickedCol; col++) {
          const currentIndex = clickedRow * 4 + col;
          const nextIndex = clickedRow * 4 + (col + 1);
          [newTiles[currentIndex], newTiles[nextIndex]] = [newTiles[nextIndex], newTiles[currentIndex]];
        }
      }
      await animateMove(tiles, newTiles);
    } else if (clickedCol === emptyCol) {
      // Same column - slide vertically
      const newTiles = [...tiles];
      if (clickedRow < emptyRow) {
        // Slide tiles down (empty moves up)
        for (let row = emptyRow; row > clickedRow; row--) {
          const currentIndex = row * 4 + clickedCol;
          const prevIndex = (row - 1) * 4 + clickedCol;
          [newTiles[currentIndex], newTiles[prevIndex]] = [newTiles[prevIndex], newTiles[currentIndex]];
        }
      } else {
        // Slide tiles up (empty moves down)
        for (let row = emptyRow; row < clickedRow; row++) {
          const currentIndex = row * 4 + clickedCol;
          const nextIndex = (row + 1) * 4 + clickedCol;
          [newTiles[currentIndex], newTiles[nextIndex]] = [newTiles[nextIndex], newTiles[currentIndex]];
        }
      }
      await animateMove(tiles, newTiles);
    }
  };

  // Pattern to show after solving: [empty, L, D, L], [L, L, D, L], [L, L, L, D], [L, L, D, L]
  const patternBlocks = [
    'empty', 'L', 'D', 'L',
    'L', 'L', 'D', 'L', 
    'L', 'L', 'L', 'D',
    'L', 'L', 'D', 'L'
  ];

  return (
    <ClueScroll>
      <div className="text-center">
        <p className="text-amber-100 text-lg leading-relaxed tracking-wide quill-font mb-4">
          Arrange the numbers in order
        </p>

        <div className="grid grid-cols-4 gap-1 w-64 h-64 mx-auto">
          {showPattern ? (
            // Show the pattern blocks
            patternBlocks.map((block, index) => (
              <div
                key={index}
                className={`
                  flex items-center justify-center text-xl font-bold rounded
                  ${block === 'empty' 
                    ? 'bg-transparent border-transparent' 
                    : block === 'D'
                    ? 'bg-gray-800 border-2 border-gray-600'
                    : ''
                  }
                `}
                style={{
                  fontFamily: 'Quill, serif',
                  imageRendering: 'crisp-edges',
                  background: block === 'L' ? 'linear-gradient(135deg, #7A7A7A 0%, #8C8C8C 20%, #A0A0A0 50%, #8C8C8C 80%, #7A7A7A 100%)' : undefined,
                  border: block === 'L' ? '3px solid' : undefined,
                  borderColor: block === 'L' ? '#808080 #2A2A2A #2A2A2A #909090' : undefined,
                  boxShadow: block === 'L' ? 'inset 2px 2px 0 rgba(70, 70, 70, 0.2), inset -2px -2px 0 rgba(0, 0, 0, 0.4)' : undefined
                }}
              >
              </div>
            ))
          ) : (
            // Show the number tiles
            tiles.map((tile, index) => (
              <div
                key={`tile-${tile}-${index}`}
                onClick={() => handleTileClick(index)}
                className={`
                  flex items-center justify-center text-xl font-bold rounded cursor-pointer slider-tile
                  ${tile === 0 
                    ? 'bg-transparent' 
                    : 'text-black'
                  }
                  ${tile !== 0 && getValidMoves(tiles.indexOf(0)).includes(index) && !isAnimating ? 'hover:scale-105' : ''}
                  ${isAnimating ? 'pointer-events-none' : ''}
                `}
                style={{
                  fontFamily: 'Quill, serif',
                  imageRendering: 'crisp-edges',
                  background: tile !== 0 ? 'linear-gradient(135deg, #7A7A7A 0%, #8C8C8C 20%, #A0A0A0 50%, #8C8C8C 80%, #7A7A7A 100%)' : undefined,
                  border: tile !== 0 ? '3px solid' : undefined,
                  borderColor: tile !== 0 ? '#808080 #2A2A2A #2A2A2A #909090' : undefined,
                  boxShadow: tile !== 0 ? 'inset 2px 2px 0 rgba(70, 70, 70, 0.2), inset -2px -2px 0 rgba(0, 0, 0, 0.4)' : undefined,
                  transform: getTransform(tile, index),
                  zIndex: animatingTiles[tile] ? 10 : 1
                }}
              >
                {tile !== 0 && tile}
              </div>
            ))
          )}
        </div>

        <div className="mt-4">
          {!isComplete && (
            <button
              onClick={shufflePuzzle}
              className="quill-font text-amber-100 text-sm hover:text-amber-200 transition-colors cursor-pointer underline"
            >
              Shuffle
            </button>
          )}

          {isComplete && !showPattern && (
            <p className="text-green-400 text-lg quill-font">
              Puzzle Solved!
            </p>
          )}

          {showPattern && (
            <p className="text-green-400 text-lg quill-font">
              Pattern Revealed!
            </p>
          )}
        </div>

        {/* Hidden solve button in bottom right */}
        <button
          onClick={() => setTiles([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0])}
          className="fixed bottom-4 right-4 w-16 h-16 bg-transparent opacity-0 hover:opacity-100 transition-opacity"
          style={{ zIndex: 9999 }}
          title="Solve"
        >
        </button>
      </div>
    </ClueScroll>
  );
}