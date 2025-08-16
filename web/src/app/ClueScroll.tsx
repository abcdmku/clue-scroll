import { ReactNode } from "react";

export function ClueScroll({children}: {children: ReactNode}) {
  return (
    <div className="relative">
      {/* Dark green moving blurs */}
      <div className="dark-green-blur dark-green-blur-1"></div>
      <div className="dark-green-blur dark-green-blur-2"></div>
      <div className="dark-green-blur dark-green-blur-3"></div>
      
      {/* Use the actual blank clue image */}
      <img 
        src="/blankclue.png" 
        alt="Clue Scroll" 
        className="w-[600px] h-auto relative z-10"
        style={{ imageRendering: 'crisp-edges' }}
      />
      
      {/* Content overlay - positioned over the parchment area */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center px-20 py-16 ps-22">
          {children}
        </div>
      </div>
    </div>
  );
}