
import confetti from 'canvas-confetti';

interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  scalar?: number;
  ticks?: number;
  origin?: {
    x: number;
    y: number;
  };
  angle?: number;
  colors?: string[];
  shapes?: ('square' | 'circle')[];
  zIndex?: number;
}

export const createConfetti = (options: ConfettiOptions = {}) => {
  const defaults: ConfettiOptions = {
    particleCount: 100,
    spread: 70,
    startVelocity: 30,
    decay: 0.95,
    gravity: 1,
    ticks: 200,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#ff577f', '#ff884b', '#ffd384', '#fff9b0', '#a3ddcb', '#7fc8f8', '#9b87f5', '#d6bcfa'],
    shapes: ['square', 'circle'],
    zIndex: 100
  };

  const mergedOptions = { ...defaults, ...options };
  
  confetti({
    ...mergedOptions,
    disableForReducedMotion: true
  });
};

export const burstConfetti = (count: number = 5, interval: number = 300) => {
  let i = 0;
  const timer = setInterval(() => {
    if (i >= count) {
      clearInterval(timer);
      return;
    }
    
    createConfetti({
      particleCount: 80,
      spread: 100,
      origin: { 
        x: Math.random() * 0.6 + 0.2, 
        y: Math.random() * 0.4 + 0.2 
      }
    });
    
    i++;
  }, interval);
};

export const fireConfettiCannon = (direction: 'left' | 'right' | 'center' = 'center') => {
  const originX = direction === 'left' ? 0.1 : direction === 'right' ? 0.9 : 0.5;
  
  createConfetti({
    particleCount: 150,
    spread: direction === 'center' ? 360 : 90,
    origin: { x: originX, y: 0.6 },
    startVelocity: 40,
    angle: direction === 'left' ? 60 : direction === 'right' ? 120 : undefined,
    gravity: 0.8
  });
};

// Premium effects
export const createPremiumConfetti = () => {
  // Golden confetti shower
  createConfetti({
    particleCount: 150,
    spread: 70,
    origin: { x: 0.5, y: 0.3 },
    colors: ['#FFD700', '#FFC107', '#FFEB3B', '#FFFFFF'],
    gravity: 0.7,
    scalar: 1.2,
    shapes: ['circle']
  });
  
  // Side bursts
  setTimeout(() => {
    createConfetti({
      particleCount: 80,
      angle: 60,
      spread: 50,
      origin: { x: 0, y: 0.5 },
      colors: ['#9C27B0', '#673AB7', '#3F51B5', '#2196F3'],
    });
    
    createConfetti({
      particleCount: 80,
      angle: 120,
      spread: 50,
      origin: { x: 1, y: 0.5 },
      colors: ['#E91E63', '#F44336', '#FF9800', '#FFEB3B'],
    });
  }, 250);
};

// Fireworks effect
export const createFireworks = (count = 3) => {
  let i = 0;
  const interval = setInterval(() => {
    if (i >= count) {
      clearInterval(interval);
      return;
    }
    
    // Launch point
    const x = 0.2 + Math.random() * 0.6;
    const y = 0.5 + Math.random() * 0.3;
    
    // Explosion
    setTimeout(() => {
      createConfetti({
        particleCount: 80,
        spread: 360,
        startVelocity: 30,
        origin: { x, y },
        gravity: 0.5,
        colors: [
          '#FF5E78', '#FFD166', '#06D6A0', '#118AB2', '#9B87F5', 
          '#FF9B85', '#FFCB85', '#EAFF8F'
        ],
      });
    }, i * 600);
    
    i++;
  }, 700);
};

// Spiral confetti
export const createSpiralConfetti = () => {
  const duration = 5 * 1000;
  const end = Date.now() + duration;
  
  (function frame() {
    // Launch confetti from the center
    const timeLeft = end - Date.now();
    const ticks = Math.max(50, 500 * (timeLeft / duration));
    
    const x = 0.5;
    const y = 0.5;
    const angleRad = (Date.now() % 1000) / 1000 * Math.PI * 2;
    
    confetti({
      particleCount: 1,
      startVelocity: 5,
      gravity: 0.5,
      ticks,
      origin: { x, y },
      colors: ['#9B87F5', '#FF5E78', '#FFD166', '#06D6A0', '#118AB2'],
      angle: (angleRad / Math.PI) * 180,
      scalar: 2,
      shapes: ['circle'],
      drift: 0,
    });
    
    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  }());
};
