import React from 'react';
import { 
  differenceInYears, differenceInMonths, differenceInWeeks, differenceInDays, 
  differenceInHours, differenceInMinutes, differenceInSeconds 
} from 'date-fns';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Instagram } from 'lucide-react';  // Added Instagram import
import { Button } from '@/components/ui/button';  // Assuming you have a Button component

interface AgeStatsProps {
  dob: Date;
  isDarkMode: boolean;
}

export default function AgeStats({ dob, isDarkMode }: AgeStatsProps) {
  const [seconds, setSeconds] = React.useState(0);
  const [showMessage, setShowMessage] = React.useState(false);

  const now = new Date();
  
  // Calculate static values
  const years = differenceInYears(now, dob);
  const months = differenceInMonths(now, dob);
  const weeks = differenceInWeeks(now, dob);
  const days = differenceInDays(now, dob);
  const hours = differenceInHours(now, dob);
  const minutes = differenceInMinutes(now, dob);
  
  // Update seconds live
  React.useEffect(() => {
    const interval = setInterval(() => {
      const currentSeconds = differenceInSeconds(new Date(), dob);
      setSeconds(currentSeconds);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [dob]);

  // Show birthday message after 2 seconds (you can adjust timing)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle "Return Home" button click
  const handleReturnHome = () => {
    // Customize this behavior as needed (e.g., navigate to home page)
    window.location.href = '/'; // simple redirect example
  };
  
  // Get milestone message based on age
  const getMilestoneMessage = () => {
    if (years < 18) {
      return {
        title: "Teen Years",
        message: "These formative years are perfect for exploration, learning, and discovering your passions. Embrace every opportunity to grow and learn!"
      };
    } else if (years < 25) {
      return {
        title: "Early Twenties",
        message: "Your twenties are perfect for exploration and building your foundation. Set bold goals and take inspired action toward your dreams!"
      };
    } else if (years < 30) {
      return {
        title: "Late Twenties",
        message: "This is a time of refinement and focus. You're gaining clarity about your path and have the energy to pursue it with dedication!"
      };
    } else {
      return {
        title: "Thirties and Beyond",
        message: "A time of confidence and achievement. You've gained valuable experience and are positioned to make your most significant contributions!"
      };
    }
  };
  
  const milestone = getMilestoneMessage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card 
        className={`overflow-hidden transform transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-900/80 border-gray-800 shadow-[0_4px_20px_rgba(236,72,153,0.15)]' 
            : 'bg-white/90 border-gray-200'
        }`}
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Star className={`h-6 w-6 text-pink-500 ${isDarkMode ? 'filter drop-shadow-[0_0_8px_rgba(236,72,153,0.7)]' : ''}`} />
            <span>Age Milestone & Stats for Snigdha</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-pink-50'} text-center`}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
              You've successfully completed:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <StatItem 
                label="incredible years" 
                value={years} 
                isDarkMode={isDarkMode} 
                delay={0.1}
                highlight
              />
              <StatItem 
                label="months of experiences" 
                value={months} 
                isDarkMode={isDarkMode} 
                delay={0.2}
              />
              <StatItem 
                label="weeks of memories" 
                value={weeks} 
                isDarkMode={isDarkMode} 
                delay={0.3}
              />
              <StatItem 
                label="days of moments that matter" 
                value={days} 
                isDarkMode={isDarkMode} 
                delay={0.4}
              />
              <StatItem 
                label="hours of living fully" 
                value={hours} 
                isDarkMode={isDarkMode} 
                delay={0.5}
              />
              <StatItem 
                label="minutes of making a difference" 
                value={minutes} 
                isDarkMode={isDarkMode} 
                delay={0.6}
              />
              <StatItem 
                label="seconds of unique contributions" 
                value={seconds} 
                isDarkMode={isDarkMode} 
                delay={0.7}
                animate
                className="col-span-full"
              />
            </div>
            
            <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-900/70' : 'bg-white'} text-left`}>
              <h4 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                {milestone.title}:
              </h4>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {milestone.message}
              </p>
              
              <h4 className={`text-lg font-bold mt-4 mb-2 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                This milestone is truly worth celebrating!
              </h4>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Each phase of life brings its own special gifts and opportunities.
              </p>
              
              <h4 className={`text-lg font-bold mt-4 mb-2 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                Looking forward:
              </h4>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                The best is still ahead! Continue seeking new experiences and opportunities that bring joy and fulfillment.
                Embracing change and continuous growth leads to an ever more rewarding life journey.
              </p>
              
              <div className="mt-4 italic text-center">
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  "Every year of life is a gift to be celebrated and treasured."
                </p>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  "Today is the oldest you've ever been and the youngest you'll ever be again. Make the most of it!"
                </p>
              </div>
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
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface StatItemProps {
  label: string;
  value: number;
  isDarkMode: boolean;
  delay?: number;
  highlight?: boolean;
  animate?: boolean;
  className?: string;
}

const StatItem = ({ label, value, isDarkMode, delay = 0, highlight = false, animate = false, className = "" }: StatItemProps) => (
  <motion.div 
    className={`p-3 rounded-lg ${
      highlight 
        ? isDarkMode ? 'bg-pink-900/20 border border-pink-800/30' : 'bg-pink-100/80 border border-pink-200' 
        : isDarkMode ? 'bg-gray-800/70' : 'bg-white/80'
    } ${className}`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <div className="flex items-center justify-center">
      <motion.span 
        className={`text-2xl font-bold ${
          highlight 
            ? isDarkMode ? 'text-pink-400' : 'text-pink-600' 
            : isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}
        animate={animate ? { 
          scale: [1, 1.03, 1],
          transition: { 
            repeat: Infinity, 
            duration: 2,
            repeatType: "reverse" 
          }
        } : {}}
      >
        {value.toLocaleString()}
      </motion.span>
    </div>
    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
      {label}
    </div>
  </motion.div>
);
