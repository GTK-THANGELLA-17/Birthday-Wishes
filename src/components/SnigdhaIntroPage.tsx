
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PartyPopper, Gift, Cake, Sparkles, Sun, Moon, Instagram } from 'lucide-react';
import LoadingAnimation from './LoadingAnimation';

interface SnigdhaIntroPageProps {
  onEnter: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function SnigdhaIntroPage({ onEnter, isDarkMode, toggleDarkMode }: SnigdhaIntroPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

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
  
  // Get theme-specific colors - using ice blue and light orange as requested
  const getThemeColors = () => {
    if (isDarkMode) {
      // Dark mode - ice blue, charcoal black, light orange
      return {
        primaryColor: 'text-blue-300', // ice blue
        secondaryColor: 'text-orange-300', // light orange
        bgGradient: 'bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950', // charcoal black gradient
        cardBg: 'bg-gray-900 border-gray-800',
        textColor: 'text-white',
        buttonBg: 'bg-blue-300 hover:bg-blue-400', // ice blue button
        buttonText: 'text-gray-900', // black text
        accentColor: 'text-orange-300'
      };
    } else {
      // Light mode - ice blue, black, white
      return {
        primaryColor: 'text-blue-400', // ice blue
        secondaryColor: 'text-gray-900', // black
        bgGradient: 'bg-gradient-to-r from-white via-blue-50 to-white', // white with subtle blue
        cardBg: 'bg-white border-gray-200',
        textColor: 'text-gray-900',
        buttonBg: 'bg-blue-300 hover:bg-blue-400', // ice blue button
        buttonText: 'text-black', // black text
        accentColor: 'text-blue-500'
      };
    }
  };
  
  const colors = getThemeColors();

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-screen"
        >
          <LoadingAnimation isDarkMode={isDarkMode} isIntro={true} />
        </motion.div>
      ) : (
        <motion.div 
          key="intro"
          className={`min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden ${colors.bgGradient}`}
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
            <div className="absolute top-4 right-4">
              <Button
                variant="outline" 
                size="icon"
                onClick={toggleDarkMode}
                className={`rounded-full transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'
                } shadow-md`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
                <PartyPopper className={`h-12 w-12 ${isDarkMode ? 'text-orange-300' : 'text-blue-500'}`} />
                <Cake className={`h-12 w-12 ${isDarkMode ? 'text-blue-300' : 'text-blue-400'}`} />
                <Gift className={`h-12 w-12 ${isDarkMode ? 'text-orange-400' : 'text-blue-500'}`} />
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
                      ? 'bg-gradient-to-r from-blue-300 via-blue-400 to-orange-300' 
                      : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600'
                  }`}
                  animate={{
                    color: isDarkMode 
                      ? ["#93C5FD", "#7DD3FC", "#FB923C", "#93C5FD"] 
                      : ["#60A5FA", "#3B82F6", "#2563EB", "#60A5FA"],
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                    }
                  }}
                >
                   Hey HI👋.. Pandu!💫 Or should I say Snigdha? 😄
                </motion.h1>
                
                <motion.p 
                  className={`text-xl md:text-2xl ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  } max-w-2xl mx-auto font-birthday`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  Get ready for a magical birthday experience, filled with personalized wishes, unforgettable milestones, and the most beautiful celebrations! 🎉🎂✨
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
                  className={`text-lg px-8 py-6 relative overflow-hidden group ${colors.buttonBg} ${colors.buttonText}`}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Click Start Celebrating
                </Button>
              </motion.div>
            </motion.div>

            {/* Developer credit with Instagram link */}
            <motion.div
              className="absolute bottom-4 right-4 flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Developed by GTK
              </span>
              <motion.a 
                href="https://www.instagram.com/" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`text-xs ${isDarkMode ? 'text-orange-300' : 'text-blue-500'}`}
              >
                <Instagram size={16} />
              </motion.a>
            </motion.div>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes shimmer {
              100% {
                transform: translateX(100%);
              }
            }
            
            .animate-shimmer {
              animation: shimmer 2s infinite;
            }
            
            .font-birthday {
              font-family: 'Dancing Script', cursive;
            }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
