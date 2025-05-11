import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PartyPopper, Gift, Cake, Heart, Sparkles, CakeSlice, Star, CalendarHeart } from 'lucide-react';
import { format } from 'date-fns';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { fireConfettiCannon } from '@/lib/confetti';

interface SnigdhaIntroProps {
  onStart: () => void;
  isDarkMode: boolean;
  birthdayDate: Date;
  onDateSelection?: (date: Date) => void;
}

export default function SnigdhaIntro({ 
  onStart, 
  isDarkMode,
  birthdayDate,
  onDateSelection
}: SnigdhaIntroProps) {
  const [isSpecialDay, setIsSpecialDay] = useState(false);
  const [daysUntilBirthday, setDaysUntilBirthday] = useState(0);
  const [timeString, setTimeString] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [is3DEnabled, setIs3DEnabled] = useState(true);
  const { toast } = useToast();
  
  // Calculate days until birthday
  useEffect(() => {
    const calculateDaysUntilBirthday = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Create this year's birthday
      const thisYearBirthday = new Date(currentYear, birthdayDate.getMonth(), birthdayDate.getDate());
      
      // If birthday has passed this year, look at next year's birthday
      if (now > thisYearBirthday) {
        const nextYearBirthday = new Date(currentYear + 1, birthdayDate.getMonth(), birthdayDate.getDate());
        const diffTime = nextYearBirthday.getTime() - now.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      } else {
        const diffTime = thisYearBirthday.getTime() - now.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }
    };
    
    // Check if today is her birthday
    const checkIfBirthday = () => {
      const today = new Date();
      return today.getDate() === birthdayDate.getDate() && 
             today.getMonth() === birthdayDate.getMonth();
    };
    
    const isBirthday = checkIfBirthday();
    setIsSpecialDay(isBirthday);
    setDaysUntilBirthday(calculateDaysUntilBirthday());
    
    if (isBirthday) {
      // Fire confetti if it's birthday
      setTimeout(() => {
        fireConfettiCannon('center');
        fireConfettiCannon('left');
        fireConfettiCannon('right');
      }, 1000);
    }
    
    // Show initial animation after a slight delay
    setTimeout(() => {
      setShowAnimation(true);
    }, 500);
    
    // Update counters every second
    const timer = setInterval(() => {
      updateTimeString();
    }, 1000);
    
    return () => clearInterval(timer);
  }, [birthdayDate]);
  
  // Update the countdown string
  const updateTimeString = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let targetDate = new Date(currentYear, birthdayDate.getMonth(), birthdayDate.getDate());
    
    // If birthday has passed this year, target next year
    if (now > targetDate) {
      targetDate = new Date(currentYear + 1, birthdayDate.getMonth(), birthdayDate.getDate());
    }
    
    const diff = targetDate.getTime() - now.getTime();
    
    if (diff <= 0) {
      setTimeString("It's your birthday today!");
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    setTimeString(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  };
  
  // Calculate age
  const getAge = () => {
    const today = new Date();
    const birthDate = birthdayDate;
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Handle start celebration with animation
  const handleStart = () => {
    fireConfettiCannon('center');
    toast({
      title: "Starting Celebration!",
      description: "Get ready for Snigdha's birthday special!"
    });
    onStart();
  };
  
  // Toggle 3D effects
  const toggle3DEffects = () => {
    setIs3DEnabled(!is3DEnabled);
    toast({
      title: is3DEnabled ? "3D Effects Disabled" : "3D Effects Enabled",
      description: is3DEnabled ? "Switched to standard view" : "Enjoy the enhanced 3D experience",
    });
  };
  
  // Animated meteor effect
  const meteorElements = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    size: Math.random() * 30 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }));
  
  const handleDateChange = (newDate: Date) => {
    if (onDateSelection) {
      onDateSelection(newDate);
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Meteor effect */}
      {is3DEnabled && (
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
      )}
      
      {/* Accessibility toggle for 3D effects */}
      <div className="absolute top-4 right-4 md:right-8 z-10 flex items-center gap-2">
        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>3D Effects</span>
        <Switch checked={is3DEnabled} onCheckedChange={toggle3DEffects} />
      </div>
      
      <div className="max-w-3xl w-full space-y-12 z-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.3,
            type: "spring",
            stiffness: 100
          }}
          className="text-center space-y-6"
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
            <Heart className="h-12 w-12 text-pink-500" />
            <CakeSlice className="h-12 w-12 text-pink-500" />
            <Gift className="h-12 w-12 text-pink-500" />
          </motion.div>

          <motion.h1 
            className={`text-5xl md:text-7xl font-bold bg-clip-text text-transparent ${
              isDarkMode 
                ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400' 
                : 'bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500'
            } pulse-glow`}
            animate={{
              scale: [1, 1.05, 1],
              transition: {
                duration: 3,
                repeat: Infinity,
              }
            }}
          >
            Happy Birthday Snigdha!
          </motion.h1>
          
          <motion.p 
            className={`text-xl md:text-2xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } max-w-2xl mx-auto font-birthday`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            {isSpecialDay ? (
              "Today is your special day! Click below to see your celebration!"
            ) : (
              <>Celebrating the amazing person you are!</>
            )}
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showAnimation ? 1 : 0, 
            y: showAnimation ? 0 : 20
          }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-full"
        >
          <Card 
            className={`overflow-hidden ${isDarkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/90 border-gray-200'} ${is3DEnabled ? 'birthday-card-3d' : ''}`}
          >
            <CardHeader className="text-center">
              <CardTitle className={`text-3xl ${isDarkMode ? 'text-white' : 'text-gray-800'} flex items-center justify-center gap-2`}>
                <CalendarHeart className={`h-6 w-6 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`} />
                <span>Snigdha's Birthday</span>
              </CardTitle>
              <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                {format(birthdayDate, "MMMM dd, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-pink-50'} flex flex-col items-center justify-center text-center`}
                  whileHover={is3DEnabled ? { 
                    scale: 1.05, 
                    boxShadow: isDarkMode 
                      ? "0 8px 30px -5px rgba(236, 72, 153, 0.3)" 
                      : "0 8px 30px -5px rgba(236, 72, 153, 0.2)",
                    rotateX: 5,
                    rotateY: 5
                  } : {}}
                >
                  <Star className={`h-8 w-8 mb-2 ${isDarkMode ? 'text-pink-400' : 'text-pink-500'}`} />
                  <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Current Age</p>
                  <motion.p 
                    className={`text-4xl font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      transition: { duration: 1.5, repeat: Infinity, repeatDelay: 5 }
                    }}
                  >
                    {getAge()}
                  </motion.p>
                  <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>years old</p>
                </motion.div>
                
                <motion.div 
                  className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-purple-50'} flex flex-col items-center justify-center text-center`}
                  whileHover={is3DEnabled ? { 
                    scale: 1.05, 
                    boxShadow: isDarkMode 
                      ? "0 8px 30px -5px rgba(168, 85, 247, 0.3)" 
                      : "0 8px 30px -5px rgba(168, 85, 247, 0.2)",
                    rotateX: 5,
                    rotateY: -5
                  } : {}}
                >
                  {isSpecialDay ? (
                    <>
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          transition: { duration: 2, repeat: Infinity }
                        }}
                      >
                        <PartyPopper className={`h-8 w-8 mb-2 ${isDarkMode ? 'text-pink-400' : 'text-pink-500'}`} />
                      </motion.div>
                      <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Today is</p>
                      <motion.p 
                        className={`text-2xl font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}
                        animate={{ 
                          scale: [1, 1.1, 1],
                          y: [0, -5, 0],
                          transition: { duration: 2, repeat: Infinity }
                        }}
                      >
                        Your Birthday!
                      </motion.p>
                      <Cake className="mt-1 h-6 w-6 text-pink-500" />
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ 
                          rotate: 360,
                          transition: { duration: 20, repeat: Infinity, ease: "linear" }
                        }}
                      >
                        <Cake className={`h-8 w-8 mb-2 ${isDarkMode ? 'text-pink-400' : 'text-pink-500'}`} />
                      </motion.div>
                      <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Birthday Countdown</p>
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                        {timeString}
                      </p>
                      <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {daysUntilBirthday === 0 
                          ? "It's today!" 
                          : daysUntilBirthday === 1 
                            ? "Tomorrow!" 
                            : `${daysUntilBirthday} days left`}
                      </p>
                    </>
                  )}
                </motion.div>
              </div>
              
              <div className="flex justify-center mt-6">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  {is3DEnabled && (
                    <>
                      <motion.div 
                        className="absolute -inset-2 rounded-lg opacity-30 blur-xl"
                        animate={{ 
                          background: [
                            "radial-gradient(circle, rgba(236,72,153,0.8) 0%, rgba(219,39,119,0) 70%)",
                            "radial-gradient(circle, rgba(124,58,237,0.8) 0%, rgba(124,58,237,0) 70%)",
                            "radial-gradient(circle, rgba(236,72,153,0.8) 0%, rgba(219,39,119,0) 70%)",
                          ],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      {/* Glowing sparkle effects around button */}
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={`sparkle-${i}`}
                          className="absolute w-1 h-1 rounded-full bg-pink-300"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0],
                            x: [0, (Math.random() - 0.5) * 20, 0],
                            y: [0, (Math.random() - 0.5) * 20, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </>
                  )}
                  <Button 
                    onClick={handleStart} 
                    size="lg" 
                    className={`px-8 py-6 text-lg relative button-glow btn-edge-effect ${
                      isDarkMode 
                        ? 'bg-pink-700 hover:bg-pink-800 text-white' 
                        : 'bg-white text-pink-700 border-2 border-pink-500 hover:bg-pink-50'
                    }`}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Start Celebration
                  </Button>
                </motion.div>
              </div>
              
              {isSpecialDay && (
                <motion.div 
                  className="text-center mt-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, type: "spring" }}
                >
                  <p className={`text-lg ${isDarkMode ? 'text-pink-300' : 'text-pink-600'} font-birthday`}>
                    Happy birthday! Today is your special day! 🎂
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* 3D decorative floating elements */}
      {is3DEnabled && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`deco-${i}`}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 10 - 5, 0],
                rotate: [0, 360],
                scale: [0.5, 0.8, 0.5],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: i,
                ease: "easeInOut",
              }}
            >
              {i % 3 === 0 ? (
                <Gift size={20} className={isDarkMode ? 'text-purple-400/50' : 'text-purple-500/30'} />
              ) : i % 3 === 1 ? (
                <Cake size={20} className={isDarkMode ? 'text-pink-400/50' : 'text-pink-500/30'} />
              ) : (
                <PartyPopper size={20} className={isDarkMode ? 'text-blue-400/50' : 'text-blue-500/30'} />
              )}
            </motion.div>
          ))}
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .font-birthday {
          font-family: 'Dancing Script', cursive;
        }
        
        /* Additional 3D card effects */
        .birthday-card-3d {
          transform-style: preserve-3d;
          perspective: 1200px;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 10px 30px -15px rgba(0,0,0,0.2);
        }
        
        .birthday-card-3d:hover {
          transform: translateZ(10px) rotateX(3deg) rotateY(3deg);
          box-shadow: 0 25px 35px rgba(0,0,0,0.1);
        }
        
        /* Button animation effects */
        .btn-edge-effect {
          overflow: hidden;
        }
        
        .btn-edge-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: translateX(-100%);
        }
        
        .btn-edge-effect:hover::after {
          transform: translateX(100%);
          transition: transform 0.6s ease;
        }
      `}} />
    </motion.div>
  );
}
