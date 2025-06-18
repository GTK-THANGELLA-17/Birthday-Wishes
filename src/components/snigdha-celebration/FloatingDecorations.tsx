
import React from 'react';
import { motion } from 'framer-motion';
import { Cake, Gift, PartyPopper, Star } from 'lucide-react';

interface FloatingDecorationsProps {
  isDarkMode: boolean;
}

export function FloatingDecorations({ isDarkMode }: FloatingDecorationsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: isDarkMode ? 0.25 : 0.15,
            zIndex: 0
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360, 0],
            scale: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 5 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        >
          {i % 4 === 0 ? (
            <Cake size={20 + Math.random() * 15} className={isDarkMode ? 'text-blue-300' : 'text-blue-400'} />
          ) : i % 4 === 1 ? (
            <Gift size={20 + Math.random() * 15} className={isDarkMode ? 'text-orange-300' : 'text-blue-400'} />
          ) : i % 4 === 2 ? (
            <PartyPopper size={20 + Math.random() * 15} className={isDarkMode ? 'text-blue-300' : 'text-blue-400'} />
          ) : (
            <Star size={15 + Math.random() * 10} className={isDarkMode ? 'text-orange-300' : 'text-blue-400'} />
          )}
        </motion.div>
      ))}
      {isDarkMode && Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${15 + Math.random() * 30}px`,
            height: `${15 + Math.random() * 30}px`,
            background: i % 2 === 0 ? 
              `radial-gradient(circle, rgba(186,230,253,${0.2 + Math.random() * 0.2}) 0%, rgba(186,230,253,0) 70%)` :
              `radial-gradient(circle, rgba(251,146,60,${0.15 + Math.random() * 0.15}) 0%, rgba(251,146,60,0) 70%)`,
            filter: 'blur(8px)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, Math.random() * 30 - 15, 0],
            y: [0, Math.random() * 30 - 15, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}
