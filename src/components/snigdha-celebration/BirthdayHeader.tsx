
import { motion } from 'framer-motion';
import { PartyPopper, Cake } from 'lucide-react';
import React from 'react';

interface BirthdayHeaderProps {
  name: string;
  age: number;
  isDarkMode: boolean;
}

export function BirthdayHeader({ name, age, isDarkMode }: BirthdayHeaderProps) {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-center space-y-2"
    >
      <motion.div 
        className="flex items-center justify-center gap-3 mb-2"
        animate={{ y: [0, -10, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
      >
        <PartyPopper className={`h-8 w-8 ${isDarkMode ? 'text-orange-300 filter drop-shadow-[0_0_8px_rgba(251,146,60,0.7)]' : 'text-blue-500'}`} />
        <Cake className={`h-8 w-8 ${isDarkMode ? 'text-blue-300 filter drop-shadow-[0_0_8px_rgba(186,230,253,0.7)]' : 'text-blue-500'}`} />
        <PartyPopper className={`h-8 w-8 ${isDarkMode ? 'text-orange-300 filter drop-shadow-[0_0_8px_rgba(251,146,60,0.7)]' : 'text-blue-500'}`} />
      </motion.div>
      <div className="relative py-4 overflow-visible">
        {/* Special 3D treatment for name and "Happy Birthday" */}
        <motion.h1 
          className="text-5xl md:text-7xl font-bold pulse-glow perspective-text"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          <motion.span 
            className={`inline-block ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-300 via-orange-300 to-blue-300 text-transparent bg-clip-text filter drop-shadow-[0_0_12px_rgba(186,230,253,0.7)]' 
                : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 text-transparent bg-clip-text'
            }`}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Happy {age}
            <motion.span
              animate={{ rotateY: [0, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block origin-center mx-1"
            >th</motion.span> Birthday,
          </motion.span>
          <div className="mt-2 relative">
            {Array.from(name.toUpperCase()).map((letter, i) => (
              <motion.span
                key={`name-letter-${i}`}
                className={`inline-block mx-[0.01em] ${
                  letter === 'S' || letter === 'D' ? 'text-[1.05em] font-black tracking-wider' : ''
                } ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-blue-300 via-blue-400 to-orange-300 text-transparent bg-clip-text filter drop-shadow-[0_0_15px_rgba(186,230,253,0.8)]' 
                    : 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text'
                }`}
                animate={{
                  y: letter === 'S' || letter === 'D' ? [0, -8, 0] : [0, -3, 0],
                  rotateY: letter === 'S' || letter === 'D' ? [0, 20, 0] : [0, 5, 0],
                  scale: letter === 'S' || letter === 'D' ? [1, 1.2, 1] : [1, 1.05, 1]
                }}
                transition={{
                  duration: letter === 'S' || letter === 'D' ? 3 : 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {letter}
              </motion.span>
            ))}
            {/* Glow effect under the name specifically for dark mode */}
            {isDarkMode && (
              <motion.div
                className="absolute -bottom-4 left-0 right-0 h-2 rounded-full mx-auto"
                style={{
                  width: '80%',
                  background: 'linear-gradient(90deg, rgba(186,230,253,0) 0%, rgba(186,230,253,0.7) 50%, rgba(186,230,253,0) 100%)',
                  filter: 'blur(8px)'
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  width: ['70%', '90%', '70%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </div>
        </motion.h1>
      </div>
      {/* Date of birth not handled here (leave date below in parent) */}
    </motion.div>
  );
}
