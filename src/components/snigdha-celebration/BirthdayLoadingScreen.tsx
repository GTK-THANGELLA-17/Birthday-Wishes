
import { motion } from 'framer-motion';
import { Cake } from 'lucide-react';
import React from 'react';

interface BirthdayLoadingScreenProps {
  isDarkMode: boolean;
  name: string;
}

export function BirthdayLoadingScreen({ isDarkMode, name }: BirthdayLoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8], 
            opacity: [0.5, 1, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <Cake className={`h-16 w-16 ${isDarkMode ? 'text-blue-300 filter drop-shadow-[0_0_8px_rgba(186,230,253,0.7)]' : 'text-blue-500'}`} />
        </motion.div>
        
        <motion.div 
          className="absolute inset-0 rounded-full"
          initial={{ scale: 1 }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(circle, ${isDarkMode ? 'rgba(186,230,253,0.3)' : 'rgba(96,165,250,0.5)'} 0%, rgba(236,72,153,0) 70%)`
          }}
        />
      </div>
      <motion.p 
        className={`mt-6 text-lg font-birthday ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Creating {name}&apos;s special birthday celebration...
      </motion.p>
      <div className="mt-8 flex items-center justify-center">
        {Array.from(name.toUpperCase()).map((letter, i) => (
          <motion.div
            key={`loading-letter-${i}`}
            className={`inline-block mx-[1px] text-3xl font-bold ${
              letter === 'G' ? 'tracking-wide font-extrabold' : ''
            } ${
              isDarkMode 
                ? 'text-blue-300 filter drop-shadow-[0_0_8px_rgba(186,230,253,0.8)]' 
                : 'text-blue-500 filter drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]'
            }`}
            style={{
              transformStyle: 'preserve-3d',
              textShadow: isDarkMode ? '0 0 10px rgba(186,230,253,0.8)' : 'none'
            }}
            animate={{
              y: [0, -15, 0],
              rotateY: letter === 'G' ? [0, 20, 0] : [0, 10, 0], // Special emphasis on certain letters
              rotateX: [0, 5, 0],
              scale: letter === 'G' ? [1, 1.2, 1] : [1, 1.05, 1]
            }}
            transition={{
              duration: letter === 'G' ? 3 : 2,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {letter}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
