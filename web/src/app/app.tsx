import Clues from './clues';

export function App() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundColor: '#1a0f0a'
    }}>
      {/* OSRS-style dark brown background with more visible blur */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #2d1810 0%, #1a0f0a 25%, #0f0704 50%, #1a0f0a 75%, #2d1810 100%)',
        filter: 'blur(80px)',
        transform: 'scale(1.1)'
      }}></div>
      
      {/* Additional blur layers for depth */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(92, 51, 23, 0.6) 0%, transparent 50%),
          radial-gradient(circle at 80% 50%, rgba(92, 51, 23, 0.6) 0%, transparent 50%),
          radial-gradient(circle at 50% 20%, rgba(61, 33, 15, 0.5) 0%, transparent 50%),
          radial-gradient(circle at 50% 80%, rgba(61, 33, 15, 0.5) 0%, transparent 50%)
        `,
        filter: 'blur(100px)'
      }}></div>
      
      {/* Animated dark green mystical fog */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-pulse" style={{
          background: 'radial-gradient(circle, rgba(29, 78, 29, 0.5) 0%, transparent 60%)',
          filter: 'blur(120px)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(19, 52, 19, 0.6) 0%, transparent 60%)',
          filter: 'blur(100px)',
          animation: 'float 10s ease-in-out infinite reverse'
        }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(34, 68, 34, 0.4) 0%, transparent 70%)',
          filter: 'blur(90px)',
          animation: 'float 12s ease-in-out infinite',
          animationDelay: '2s'
        }}></div>
      </div>
      
      {/* Dark vignette effect with brown tint */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at center, transparent 0%, rgba(26, 15, 10, 0.5) 60%, rgba(10, 6, 4, 0.95) 100%)'
      }}></div>
      
      {/* Warm torch light effects */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full animate-pulse" style={{
        background: 'radial-gradient(circle, rgba(255, 147, 41, 0.3) 0%, transparent 70%)',
        filter: 'blur(60px)'
      }}></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full animate-pulse" style={{
        background: 'radial-gradient(circle, rgba(255, 147, 41, 0.3) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animationDelay: '1s'
      }}></div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center">

          <Clues clueIndex={3} />

        </div>
      </main>
    </div>
  );
}

export default App;