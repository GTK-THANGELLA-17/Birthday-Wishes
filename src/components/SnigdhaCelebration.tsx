import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Cake, Gift, PartyPopper, Star, Moon, Sun, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fireConfettiCannon } from '@/lib/confetti';
import AgeStats from './AgeStats';
import WishCard from './WishCard';
import EnhancedCarousel from './EnhancedCarousel';
import AudioController from './AudioController';
import ShareAgeStats from './ShareAgeStats';

interface SnigdhaCelebrationProps {
  name: string;
  dob: Date;
  isDarkMode: boolean;
  photoUrl?: string;
  onReturnHome: () => void;
  toggleDarkMode?: () => void; // Make it optional
  autoPlayVoice?: boolean;
}

export default function SnigdhaCelebration({ 
  name, 
  dob, 
  isDarkMode, 
  photoUrl, 
  onReturnHome,
  toggleDarkMode,
  autoPlayVoice = false
}: SnigdhaCelebrationProps) {
  const { toast } = useToast();
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const autoPlayedRef = useRef(false);
  const voiceMessageRef = useRef<HTMLButtonElement | null>(null);
  const ageStatsRef = useRef<HTMLDivElement>(null);
  
  // Force the age to be 18
  const age = 18;
  
  // Array of birthday wishes for Snigdha
  const wishes = [
     "🎂 May your day be as bright and beautiful as you are! 🌞🌸\nOn this special birthday, I hope all your dreams take flight. 🕊️✨",
    "🎉 Wishing you a day filled with happiness and a year filled with joy. \nMay your path always be illuminated with love and success. 🌈🌟",
    " Sending you the warmest wishes on your special day.\nIn this magical May, you deserve all the happiness the world has to offer! 🌷🌼🥰",
    "🌠 May all your dreams and wishes come true in this coming year.\nYour presence truly makes the world a better place! 🌍💫",
    "🎈 Happy Birthday!\nMay your day be filled with joy, laughter, and unforgettable moments that become cherished memories! 🎁📸"
];
  
  // Array of memories/slide images and videos - using high quality content
  const memories = [
    { 
      type: "image" as const,
      src: "/Birthday 2.jpg", 
      alt: "Celebrating under the stars" 
    },
    { 
      type: "video" as const,
      src: "/CD 1.mp4",
      poster: "/Birthday 1.jpg"
    },
    { 
      type: "video" as const,
      src: "/H B 5.mp4", 
      poster: "/Birthday 2.jpg"
    },
    { 
      type: "video" as const,
      src: "/HB 17.mp4",
      poster: "/Birthday 3.jpg"
    },
    { 
      type: "video" as const,
      src: "/HB 15.mp4",
      poster: "/Birthday 1.jpg"
    },
    { 
      type: "image" as const,
      src: "/Birthday 3.jpg", 
      alt: "Celebrating under the stars" 
    },
    { 
      type: "video" as const,
      src: "/HB 9.mp4",
      poster: "/Birthday 3.jpg"
    },
    
  ];

  // Check if the page visibility changes to handle voice playback
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && voiceMessageRef.current) {
        // Page is now hidden, pause voice if playing
        const pauseEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        
        // Find any playing audio and pause it
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach(audio => {
          if (!audio.paused) {
            audio.pause();
          }
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Auto fire confetti when loaded with enhanced effects
      fireConfettiCannon('center');
      setTimeout(() => fireConfettiCannon('left'), 300);
      setTimeout(() => fireConfettiCannon('right'), 600);
      setTimeout(() => fireConfettiCannon('center'), 1000);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Auto-play voice message when component mounts - user must have interacted with the page first
  useEffect(() => {
    if (autoPlayVoice && !autoPlayedRef.current) {
      const timer = setTimeout(() => {
        if (voiceMessageRef.current) {
          // Don't auto-play voice message as per requirement
          // voiceMessageRef.current.click();
          autoPlayedRef.current = true; // Mark as played to prevent replay on refresh
        }
      }, 3000); // Wait for page to fully load before playing
      
      return () => clearTimeout(timer);
    }
  }, [autoPlayVoice, isLoading]);
  
  // Show message with animation delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Periodic confetti effect with properly typed confetti positions 
  useEffect(() => {
    const positions = ['left', 'center', 'right'] as const;
    
    const intervalId = setInterval(() => {
      const direction = Math.random() > 0.5 ? positions[0] : positions[2];
      fireConfettiCannon(direction);
    }, 15000);
    
    // Additional random confetti bursts for surprise moments
    const randomBurstId = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of a random burst
        const randomPosition = positions[Math.floor(Math.random() * positions.length)];
        fireConfettiCannon(randomPosition);
      }
    }, 8000);
    
    return () => {
      clearInterval(intervalId);
      clearInterval(randomBurstId);
    };
  }, []);
  
  const handleReturnHome = () => {
    toast({
      title: "Returning Home",
      description: "Taking you back to the beginning",
    });
    onReturnHome();
  };
  
  // Loading screen with birthday theme
  if (isLoading) {
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
          Creating {name}'s special birthday celebration...
        </motion.p>
        
        {/* 3D floating letters for name during loading */}
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
    );
  }
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen w-full p-4 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute top-4 left-4 z-10">
        <Button 
          onClick={handleReturnHome} 
          variant="outline" 
          size="sm" 
          className={`flex items-center gap-1 ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-700 text-white hover:bg-gray-800'
              : 'bg-white text-gray-900 border border-gray-300'
          } btn-edge-effect shadow-md hover:shadow-lg transition-all`}
        >
          <span>Return Home</span>
        </Button>
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        {toggleDarkMode && (
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
        )}
        <AudioController 
          isIntro={false}
          isDarkMode={isDarkMode}
          autoPlay={true}
        />
      </div>
      
      <div className="max-w-5xl w-full mx-auto space-y-8">
        {/* Birthday header with enhanced 3D animation */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-2"
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-2"
            animate={{ 
              y: [0, -10, 0],
              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <PartyPopper className={`h-8 w-8 ${isDarkMode ? 'text-orange-300' : 'text-blue-500'} ${isDarkMode ? 'filter drop-shadow-[0_0_8px_rgba(251,146,60,0.7)]' : ''}`} />
            <Cake className={`h-8 w-8 ${isDarkMode ? 'text-blue-300' : 'text-blue-500'} ${isDarkMode ? 'filter drop-shadow-[0_0_8px_rgba(186,230,253,0.7)]' : ''}`} />
            <PartyPopper className={`h-8 w-8 ${isDarkMode ? 'text-orange-300' : 'text-blue-500'} ${isDarkMode ? 'filter drop-shadow-[0_0_8px_rgba(251,146,60,0.7)]' : ''}`} />
          </motion.div>
          
          {/* Enhanced 3D Name Display with special attention to letters */}
          <div className="relative py-4 overflow-visible">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold pulse-glow perspective-text"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
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
                  animate={{ 
                    rotateY: [0, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block origin-center mx-1"
                >
                  th
                </motion.span>
                 Birthday,
              </motion.span>
              <div className="mt-2 relative">
                {/* Special treatment for name with emphasis on certain letters */}
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
          
          <motion.p 
            className={`text-xl max-w-2xl mx-auto font-birthday ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {format(new Date(2007, 4, 12), "MMMM dd, yyyy")}
          </motion.p>
        </motion.div>

        {/* Enhanced 3D Memory slideshow with improved hover effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full"
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <motion.div 
            className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/90 border border-gray-200'} shadow-lg`}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Gift className={`h-6 w-6 ${isDarkMode ? 'text-orange-300' : 'text-blue-500'} ${isDarkMode ? 'filter drop-shadow-[0_0_8px_rgba(251,146,60,0.7)]' : ''}`} />
              </motion.div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Special Memories
              </h2>
            </div>
            
            <EnhancedCarousel 
              media={memories} 
              isDarkMode={isDarkMode}
              autoPlay={true}
              interval={2000} // Auto advance every 2 seconds as requested
            />
          </motion.div>
        </motion.div>
        
        {/* Birthday wish card with photo - enhanced animations */}
        <WishCard 
          name={name} 
          wishes={wishes} 
          isDarkMode={isDarkMode} 
          photoUrl={photoUrl} 
          voiceMessageRef={voiceMessageRef}
        />
        
        {/* Age Milestone Section with enhanced stats and share options */}
        <motion.div
          ref={ageStatsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <AgeStats dob={new Date(2007, 4, 12)} isDarkMode={isDarkMode} />
          <div className="mt-2">
            <ShareAgeStats 
              elementRef={ageStatsRef}
              isDarkMode={isDarkMode}
              filename="snigdha-18th-birthday-stats"
            />
          </div>
        </motion.div>
        
        {/* Birthday footer with enhanced animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showMessage ? 1 : 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="text-center py-8"
        >
          <motion.p 
            className={`text-lg font-birthday ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            animate={{
              scale: [1, 1.05, 1],
              y: [0, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Wishing you a day as special as you are!
          </motion.p>
          <div className="flex justify-center mt-4">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: isDarkMode ? 
                  ['0 0 0px rgba(186,230,253,0)', '0 0 15px rgba(186,230,253,0.5)', '0 0 0px rgba(186,230,253,0)'] : 
                  ['0 4px 12px rgba(96,165,250,0.2)', '0 6px 16px rgba(96,165,250,0.4)', '0 4px 12px rgba(96,165,250,0.2)']
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Button 
                onClick={handleReturnHome} 
                className={`relative button-glow btn-edge-effect shadow-md ${
                  isDarkMode 
                    ? 'bg-blue-300 hover:bg-blue-400 text-gray-900 border border-blue-200' 
                    : 'bg-blue-300 text-gray-900 border-2 border-blue-400 hover:bg-blue-400'
                }`}
              >
                Return Home
              </Button>
            </motion.div>
          </div>
          
          {/* Developer credit with Instagram link - updated Instagram profile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.5 }}
            className="mt-6 flex items-center justify-center gap-2"
          >
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Developed by GTK
            </p>
            <motion.a
              href="https://www.instagram.com/g_thangella_k?igsh=aWczdnVtaDR1N280"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
              whileTap={{ scale: 0.9 }}
              className="transition-all duration-300"
            >
              <Instagram className={`h-5 w-5 ${isDarkMode ? 'text-orange-300' : 'text-blue-500'}`} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced Floating decorative elements with more birthday-themed items */}
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
        
        {/* Additional animated elements just for dark mode - enhanced glow effects */}
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
      
      {/* Enhanced CSS for better 3D effects */}
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-text {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .perspective-3d {
          transform-style: preserve-3d;
          transform: perspective(1000px);
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .perspective-3d:hover {
          transform: perspective(1000px) rotateX(3deg) rotateY(5deg);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .btn-edge-effect {
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .btn-edge-effect:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
          z-index: -1;
          transition: all 0.6s;
        }
        
        .btn-edge-effect:hover:before {
          left: 100%;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        ${isDarkMode ? `
          .pulse-glow {
            animation: pulse-glow 3s ease-in-out infinite;
          }
          
          @keyframes pulse-glow {
            0%, 100% {
              filter: drop-shadow(0 0 5px rgba(186, 230, 253, 0.7));
            }
            50% {
              filter: drop-shadow(0 0 20px rgba(186, 230, 253, 0.9));
            }
          }
          
          .button-glow {
            position: relative;
            overflow: hidden;
          }
          
          .button-glow:after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(186,230,253,0.3) 0%, rgba(186,230,253,0) 70%);
            opacity: 0;
            transition: opacity 0.3s;
          }
          
          .button-glow:hover:after {
            opacity: 1;
          }
        ` : ''}
      ` }} />
    </motion.div>
  );
}
