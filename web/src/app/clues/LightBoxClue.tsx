import { useState } from 'react';
import { ClueScroll } from '../ClueScroll';

export function LightBoxClue({goToNextClue}: {goToNextClue: () => void}) {
  const [lights, setLights] = useState([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
  ]);
  
  const solution = [
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true],
    [true, true, true, true, true]
  ];
  
  const toggleLight = (row: number, col: number) => {
    const newLights = lights.map(r => [...r]);
    
    // Toggle the clicked light
    newLights[row][col] = !newLights[row][col];
    
    // Toggle adjacent lights (cross pattern)
    if (row > 0) newLights[row - 1][col] = !newLights[row - 1][col];
    if (row < 4) newLights[row + 1][col] = !newLights[row + 1][col];
    if (col > 0) newLights[row][col - 1] = !newLights[row][col - 1];
    if (col < 4) newLights[row][col + 1] = !newLights[row][col + 1];
    
    setLights(newLights);
    
    // Check if solved
    const isSolved = newLights.every((row, rIdx) => 
      row.every((light, cIdx) => light === solution[rIdx][cIdx])
    );
    
    if (isSolved) {
      setTimeout(() => goToNextClue(), 1000);
    }
  };
  
  const reset = () => {
    setLights([
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false]
    ]);
  };

  return (
    <ClueScroll>
      <div className="text-center">
        <p className="text-amber-100 text-sm mb-4 quill-font">
          Light all the blocks
        </p>
        
        <div className="grid grid-cols-5 gap-1.5 w-64 mx-auto mb-4">
          {lights.map((row, rIdx) => 
            row.map((isOn, cIdx) => (
              <button
                key={`${rIdx}-${cIdx}`}
                onClick={() => toggleLight(rIdx, cIdx)}
                className={`w-11 h-11 rounded-lg border-2 transition-all cursor-pointer ${
                  isOn 
                    ? 'bg-yellow-400 border-yellow-600 shadow-lg shadow-yellow-400/50' 
                    : 'bg-gray-700 border-gray-800'
                }`}
                style={{
                  boxShadow: isOn ? '0 0 20px rgba(250, 204, 21, 0.5)' : 'none'
                }}
              />
            ))
          )}
        </div>
        
        <button
          onClick={reset}
          className="quill-font text-amber-100 text-sm hover:text-amber-200 transition-colors cursor-pointer underline"
        >
          Reset Puzzle
        </button>
        
        {/* Hidden solve button in bottom right */}
        <button
          onClick={() => {
            // Set all lights to true (solution state)
            setLights([
              [true, true, true, true, true],
              [true, true, true, true, true],
              [true, true, true, true, true],
              [true, true, true, true, true],
              [true, true, true, true, true]
            ]);
            setTimeout(() => goToNextClue(), 1000);
          }}
          className="fixed bottom-4 right-4 w-16 h-16 bg-transparent opacity-0 hover:opacity-100 transition-opacity"
          style={{ zIndex: 9999 }}
          title="Solve"
        >
        </button>
      </div>
    </ClueScroll>
  );
}