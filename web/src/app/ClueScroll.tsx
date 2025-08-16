import { ReactNode } from "react";

export function ClueScroll({children}: {children: ReactNode}) {
  return (
    <div className="clue-scroll-container relative inline-block">
      {/* Use the actual blank clue image */}
      <img 
        src="/blankclue.png" 
        alt="Clue Scroll" 
        className="w-full h-auto relative z-10"
        style={{ imageRendering: 'crisp-edges' }}
      />
      
      {/* Content overlay - positioned over the parchment area */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="clue-content text-center">
          {children}
        </div>
      </div>
    </div>
  );
}