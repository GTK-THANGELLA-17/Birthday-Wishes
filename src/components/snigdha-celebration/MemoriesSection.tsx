
import React from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import SpecialMemoriesSlideshow, { MemoryItem } from '../SpecialMemoriesSlideshow';

interface MemoriesSectionProps {
  memories: MemoryItem[];
  isDarkMode: boolean;
}

export function MemoriesSection({ memories, isDarkMode }: MemoriesSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full"
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      <motion.div 
        className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/90 border border-gray-200'} shadow-lg`}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Gift className={`h-6 w-6 ${isDarkMode ? 'text-orange-300' : 'text-blue-500'} ${isDarkMode ? 'filter drop-shadow-[0_0_8px_rgba(251,146,60,0.7)]' : ''}`} />
          </motion.div>
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Special Memories</h2>
        </div>
        <SpecialMemoriesSlideshow 
          memories={memories}
          autoPlay={false}
          isDarkMode={isDarkMode}
        />
      </motion.div>
    </motion.div>
  );
}
