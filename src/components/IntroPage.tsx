
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PartyPopper, Gift, Cake, Sparkles, Info, Moon, Sun, Instagram } from 'lucide-react';
import DeveloperInfoCard from './DeveloperInfoCard';

interface IntroPageProps {
  onEnter: () => void;
  onAboutClick: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function IntroPage({ onEnter, onAboutClick, isDarkMode, toggleDarkMode }: IntroPageProps) {
  const [showDeveloperInfo, setShowDeveloperInfo] = useState(false);
  
  // Animated meteor elements
  const meteorElements = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    size: Math.random() * 30 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }));

  // Lamp effect blobs
  const lampBlobs = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    size: Math.random() * 100 + 150,
    x: (i % 2) * 100,
    y: Math.floor(i / 2) * 100,
    color: i === 0 ? 'pink' : i === 1 ? 'purple' : i === 2 ? 'blue' : 'cyan',
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 3,
  }));

  return (
    <motion.div 
      className={`min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Lamp effect background */}
      <div className="absolute inset-0 overflow-hidden">
        {lampBlobs.map((blob) => (
          <motion.div
            key={blob.id}
            className={`absolute rounded-full opacity-20 
              ${blob.color === 'pink' 
                ? 'bg-gradient-to-r from-pink-300 to-purple-300' 
                : blob.color === 'purple' 
                ? 'bg-gradient-to-r from-purple-300 to-indigo-300' 
                : blob.color === 'blue' 
                ? 'bg-gradient-to-r from-blue-300 to-cyan-300' 
                : 'bg-gradient-to-r from-cyan-300 to-teal-300'
              }
              ${isDarkMode ? 'opacity-10' : 'opacity-20'}
            `}
            style={{
              width: blob.size,
              height: blob.size,
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              filter: `blur(${blob.size / 3}px)`,
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -50, 50, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              delay: blob.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Meteor effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {meteorElements.map((meteor) => (
          <motion.div
            key={meteor.id}
            className={`absolute w-1 h-1 rounded-full ${
              isDarkMode ? 'bg-white' : 'bg-gray-900'
            }`}
            style={{
              top: `${meteor.y}%`,
              left: `${meteor.x}%`,
              boxShadow: isDarkMode 
                ? `0 0 10px 2px rgba(255,255,255,0.3)` 
                : `0 0 10px 2px rgba(0,0,0,0.2)`,
            }}
            animate={{
              top: ['0%', '100%'],
              left: [`${meteor.x}%`, `${meteor.x + (Math.random() * 20 - 10)}%`],
              opacity: [1, 0],
              width: ['1px', '3px'],
              height: ['1px', '300px'],
            }}
            transition={{
              duration: meteor.duration,
              repeat: Infinity,
              delay: meteor.delay,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="z-10 text-center space-y-12 px-4 py-12 relative">
        {/* Dark Mode Toggle */}
        <div className="absolute top-0 right-4">
          <Button
            variant="outline" 
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md"
          >
            {isDarkMode ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-black" />}
          </Button>
        </div>

        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.3,
            type: "spring",
            stiffness: 100
          }}
          className="space-y-6"
        >
          <motion.div 
            className="flex justify-center gap-4"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <PartyPopper className="h-12 w-12 text-pink-500" />
            <Cake className="h-12 w-12 text-blue-500" />
            <Gift className="h-12 w-12 text-purple-500" />
          </motion.div>

          <motion.div 
            className="space-y-4"
            whileHover={{
              scale: 1.05,
              transition: {
                duration: 0.3
              }
            }}
          >
            <motion.h1 
              className={`text-5xl md:text-7xl font-bold bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400' 
                  : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'
              }`}
              animate={{
                color: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6B6B"],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                }
              }}
            >
              My Wishes To You
            </motion.h1>
            
            <motion.p 
              className={`text-xl md:text-2xl ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              } max-w-2xl mx-auto birthday-message`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Create a magical birthday experience with personalized wishes, age milestones, and beautiful celebrations.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg" 
              onClick={onEnter}
              className="text-lg px-8 py-6 relative overflow-hidden group"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Celebrating
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg" 
              variant="outline"
              onClick={onAboutClick}
              className="text-lg px-8 py-6"
            >
              <Info className="mr-2 h-5 w-5" />
              About
            </Button>
          </motion.div>
        </motion.div>

        {/* Developer credit */}
        <motion.div 
          className="pt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => setShowDeveloperInfo(true)}
              className="text-sm bg-white text-black dark:bg-gray-900 dark:text-white border dark:border-gray-700 border-gray-200 hover:scale-105 transition-all"
            >
              Developed by G.Thangella
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8 bg-white dark:bg-gray-900 border dark:border-gray-700 border-gray-200"
              onClick={() => window.open('https://www.instagram.com/', '_blank')}
            >
              <Instagram className={`h-4 w-4 ${isDarkMode ? 'text-pink-400' : 'text-pink-500'}`} />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Developer Info Modal */}
      {showDeveloperInfo && (
        <DeveloperInfoCard onClose={() => setShowDeveloperInfo(false)} isDarkMode={isDarkMode} />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .birthday-message {
          font-family: 'Dancing Script', cursive;
        }
      `}} />
    </motion.div>
  );
}
