
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BirthdayInput from '@/components/BirthdayInput';
import IntroVideo from '@/components/IntroVideo';
import CelebrationScreen from '@/components/CelebrationScreen';
import ThemeSelector from '@/components/ThemeSelector';
import { fireConfettiCannon } from '@/lib/confetti';
import { useIsMobile } from '@/hooks/use-mobile';
import { Cake, Gift, PartyPopper, Sparkles, Stars, Moon, Sun } from 'lucide-react';
import IntroPage from '@/components/IntroPage';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type AppState = 'intro' | 'input' | 'video' | 'celebration';
export type ColorTheme = 'blue' | 'pink' | 'purple' | 'green' | 'orange';
export type Gender = 'male' | 'female' | undefined;

export default function Index() {
  const [appState, setAppState] = useState<AppState>('intro');
  const [userData, setUserData] = useState<{ name: string; dob: Date; gender?: Gender; photoUrl?: string } | null>(null);
  const [colorTheme, setColorTheme] = useState<ColorTheme>('blue');
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    toast({
      title: isDarkMode ? "Light Mode Enabled" : "Dark Mode Enabled",
      description: isDarkMode ? "Switched to light mode" : "Switched to dark mode",
    });
  };

  const handleStartCelebration = () => {
    setAppState('input');
  };

  const handleShowAbout = () => {
    setShowAboutModal(true);
  };

  const handleCelebrate = (name: string, dob: Date, gender?: Gender, photoUrl?: string) => {
    setUserData({ name, dob, gender, photoUrl });
    setAppState('video');
    
    if (gender === 'female' && colorTheme === 'blue') {
      setColorTheme('pink');
    } else if (gender === 'male' && colorTheme === 'pink') {
      setColorTheme('blue');
    }
    
    fireConfettiCannon('center');
  };

  const handleIntroComplete = () => {
    setAppState('celebration');
    fireConfettiCannon('center');
  };

  const handleReturnHome = () => {
    setAppState('intro');
    // Show a toast when returning home
    toast({
      title: "Returned to Home",
      description: "Welcome back to the main page!",
    });
  };

  const getGradient = () => {
    const isDark = isDarkMode;
    
    switch (colorTheme) {
      case 'pink':
        return isDark ? 'bg-gradient-to-b from-gray-950 to-pink-950/40' : 'bg-gradient-to-b from-white to-pink-50';
      case 'purple':
        return isDark ? 'bg-gradient-to-b from-gray-950 to-purple-950/40' : 'bg-gradient-to-b from-white to-purple-50';
      case 'green':
        return isDark ? 'bg-gradient-to-b from-gray-950 to-green-950/40' : 'bg-gradient-to-b from-white to-green-50';
      case 'orange':
        return isDark ? 'bg-gradient-to-b from-gray-950 to-orange-950/40' : 'bg-gradient-to-b from-white to-orange-50';
      case 'blue':
      default:
        return isDark ? 'bg-gradient-to-b from-gray-950 to-blue-950/40' : 'bg-gradient-to-b from-white to-blue-50';
    }
  };

  useEffect(() => {
    if (appState === 'celebration') {
      const intervalId = setInterval(() => {
        const direction = Math.random() > 0.5 ? 'left' : 'right';
        fireConfettiCannon(direction);
      }, 10000);
      
      return () => clearInterval(intervalId);
    }
  }, [appState]);

  const decorativeElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className={`absolute -top-5 -left-5 w-20 h-20 ${
          isDarkMode 
            ? `bg-gradient-to-r from-${colorTheme}-600/20 to-${colorTheme}-800/20` 
            : `bg-gradient-to-r from-${colorTheme}-400 to-${colorTheme}-600`
        } rounded-full ${isDarkMode ? 'opacity-30' : 'opacity-20'} blur-xl`}
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className={`absolute top-1/4 right-10 w-24 h-24 ${
          isDarkMode 
            ? `bg-gradient-to-r from-${colorTheme === 'blue' ? 'blue' : colorTheme}-600/20 to-violet-700/20` 
            : `bg-gradient-to-r from-${colorTheme === 'blue' ? 'blue' : colorTheme}-400 to-violet-500`
        } rounded-full ${isDarkMode ? 'opacity-30' : 'opacity-20'} blur-xl`}
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className={`absolute bottom-1/4 -left-10 w-32 h-32 ${
          isDarkMode 
            ? `bg-gradient-to-r from-yellow-500/20 to-amber-600/20` 
            : `bg-gradient-to-r from-yellow-300 to-amber-500`
        } rounded-full ${isDarkMode ? 'opacity-30' : 'opacity-20'} blur-xl`}
        animate={{ 
          y: [0, 25, 0],
          rotate: [0, 15, 0]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {!isMobile && (
        <>
          <motion.div 
            className={`absolute top-[10%] left-[15%] ${isDarkMode ? 'text-pink-400/70' : 'text-pink-400 opacity-30'}`}
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut" 
            }}
          >
            <Gift size={35} />
          </motion.div>
          
          <motion.div 
            className={`absolute top-[20%] right-[20%] ${isDarkMode ? 'text-blue-400/70' : 'text-blue-400 opacity-30'}`}
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
              delay: 1.5
            }}
          >
            <Cake size={30} />
          </motion.div>
          
          <motion.div 
            className={`absolute bottom-[25%] left-[25%] ${isDarkMode ? 'text-green-400/70' : 'text-green-400 opacity-30'}`}
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 9,
              ease: "easeInOut",
              delay: 0.8
            }}
          >
            <PartyPopper size={25} />
          </motion.div>
          
          <motion.div 
            className={`absolute bottom-[15%] right-[15%] ${isDarkMode ? 'text-purple-400/70' : 'text-purple-400 opacity-30'}`}
            animate={{ 
              y: [0, -12, 0],
              rotate: [0, -8, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
              delay: 2.2
            }}
          >
            <Sparkles size={28} />
          </motion.div>
          
          <motion.div 
            className={`absolute top-[40%] left-[5%] ${isDarkMode ? 'text-yellow-400/70' : 'text-yellow-400 opacity-30'}`}
            animate={{ 
              y: [0, -18, 0],
              rotate: [0, 15, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 7.5,
              ease: "easeInOut",
              delay: 1.2
            }}
          >
            <Stars size={40} />
          </motion.div>
        </>
      )}
    </div>
  );

  const AboutModal = () => (
    <AnimatePresence>
      {showAboutModal && (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowAboutModal(false)}
        >
          <motion.div 
            className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl p-8 max-w-lg relative overflow-hidden`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute inset-0 p-[1px]">
              <div className="h-full w-full rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-20" />
            </div>
            
            <div className="relative z-10">
              <h2 className={`text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500`}>
                About My Wishes To You
              </h2>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : ''}`}>
                This interactive birthday celebration app helps you create personalized birthday experiences.
                Celebrate special moments with customized birthday messages, age milestones, and beautiful animations.
              </p>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : ''}`}>
                You can personalize the experience based on gender, choose different color themes,
                and even add a photo of the birthday person to make it more special.
              </p>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : ''}`}>
                Share your birthday wishes on social media, listen to voice greetings with male or female voices,
                and create memorable birthday moments for your loved ones.
              </p>
              <Button 
                onClick={() => setShowAboutModal(false)}
                className="mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center py-6 md:py-10 ${getGradient()} relative overflow-hidden ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes text-reveal {
          0% { clip-path: inset(0 100% 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        
        .text-reveal {
          animation: text-reveal 0.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .perspective {
          perspective: 1000px;
        }
        
        .glass-card {
          background: ${isDarkMode ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid ${isDarkMode ? 'rgba(50, 50, 50, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
          box-shadow: 0 8px 32px ${isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
        }
        
        @keyframes text-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animated-gradient-text {
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: text-gradient 3s ease infinite;
        }
        
        .button-hover {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .button-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: all 0.6s ease;
        }
        
        .button-hover:hover::before {
          left: 100%;
        }
        
        .button-edge-effect {
          isolation: isolate;
        }
        
        .button-edge-effect::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          z-index: -1;
          background: linear-gradient(45deg, 
            ${isDarkMode ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)'}, 
            ${isDarkMode ? 'rgba(139, 92, 246, 0.5)' : 'rgba(139, 92, 246, 0.3)'}
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .button-edge-effect:active::after {
          opacity: 1;
          animation: glow-pulse 0.6s ease-out;
        }
        
        @keyframes glow-pulse {
          0% { transform: scale(0.95); opacity: 0.7; }
          70% { transform: scale(1.05); opacity: 0.9; }
          100% { transform: scale(1); opacity: 0; }
        }
        
        /* Remove blur effects from cards */
        .birthday-card,
        .milestone-card {
          backdrop-filter: none !important;
        }
        
        .birthday-card:hover,
        .milestone-card:hover {
          transform: translateY(-5px);
          filter: none !important;
          text-shadow: none !important;
        }
        
        .birthday-card *,
        .milestone-card * {
          filter: none !important;
          text-shadow: none !important;
        }
      `}} />
      
      {decorativeElements()}
      {AboutModal()}

      <div className="absolute top-4 right-4 z-10 flex items-center gap-3">
        <Button
          variant="outline" 
          size="icon"
          onClick={toggleDarkMode}
          className="rounded-full bg-white dark:bg-gray-900 text-black dark:text-white border dark:border-gray-700 shadow-md button-edge-effect"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <ThemeSelector onThemeChange={setColorTheme} currentTheme={colorTheme} />
      </div>

      {appState !== 'intro' && (
        <div className="absolute top-4 left-4 z-10">
          <Button 
            onClick={handleReturnHome} 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 bg-white dark:bg-gray-900 text-black dark:text-white border dark:border-gray-700 shadow-md button-edge-effect"
          >
            <span>Return Home</span>
          </Button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {appState === 'intro' && (
          <motion.div
            key="intro-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <IntroPage 
              onEnter={handleStartCelebration} 
              onAboutClick={handleShowAbout} 
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </motion.div>
        )}

        {appState === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl flex flex-col items-center justify-center"
          >
            <BirthdayInput 
              onCelebrate={handleCelebrate} 
              colorTheme={colorTheme} 
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </motion.div>
        )}

        {appState === 'video' && userData && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <IntroVideo 
              onComplete={handleIntroComplete} 
              videoSrc="https://media.bensound.com/bensound-video.mp4"
              colorTheme={colorTheme}
              gender={userData.gender}
            />
          </motion.div>
        )}

        {appState === 'celebration' && userData && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <CelebrationScreen 
              name={userData.name} 
              dob={userData.dob}
              colorTheme={colorTheme}
              gender={userData.gender}
              photoUrl={userData.photoUrl}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              onReturnHome={handleReturnHome}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
