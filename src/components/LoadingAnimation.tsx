
import { motion } from 'framer-motion';
import { Cake, Gift, Stars, Sparkles, Palette, Heart, Music, Clock, Instagram } from 'lucide-react';

interface LoadingAnimationProps {
  isDarkMode: boolean;
  isIntro?: boolean; // To differentiate between home and celebration loading
}

const LoadingAnimation = ({ isDarkMode, isIntro = false }: LoadingAnimationProps) => {
  // Get theme-specific colors based on dark mode
  const getColors = () => {
    if (isDarkMode) {
      return {
        primary: 'text-blue-300', // ice blue
        secondary: 'text-orange-300', // light orange
        accent: 'text-gray-700', // charcoal black
        bg: 'bg-gray-950',
        glow: 'drop-shadow-[0_0_8px_rgba(186,230,253,0.7)]' // ice blue glow
      };
    } else {
      return {
        primary: 'text-blue-400', // ice blue
        secondary: 'text-gray-900', // black
        accent: 'text-blue-100',
        bg: 'bg-white',
        glow: 'drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]' // subtle blue glow
      };
    }
  };
  
  const colors = getColors();

  // Different animations for intro and celebration loading
  if (isIntro) {
    return (
      <div className={`flex flex-col items-center justify-center h-screen overflow-hidden relative ${colors.bg}`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className={`absolute rounded-full ${isDarkMode ? 'bg-orange-300/20' : 'bg-blue-300/20'}`}
              style={{
                width: Math.random() * 12 + 3,
                height: Math.random() * 12 + 3,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0.2, 0.7, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Main animated element - ENHANCED ROTATING CLOCK ANIMATION */}
        <motion.div
          className="relative z-10 mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className={`w-48 h-48 rounded-full flex items-center justify-center relative ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}`}
            animate={{
              boxShadow: isDarkMode 
                ? ['0 0 10px 5px rgba(186,230,253,0.2)', '0 0 20px 10px rgba(186,230,253,0.4)', '0 0 10px 5px rgba(186,230,253,0.2)']
                : ['0 0 10px 5px rgba(96,165,250,0.1)', '0 0 20px 10px rgba(96,165,250,0.2)', '0 0 10px 5px rgba(96,165,250,0.1)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Clock animation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <svg width="90%" height="90%" viewBox="-50 -50 100 100">
                {/* Clock outer circle */}
                <motion.circle
                  cx="0"
                  cy="0"
                  r="45"
                  stroke={isDarkMode ? "#60A5FA" : "#2563EB"}
                  strokeWidth="2"
                  fill="none"
                  className={colors.glow}
                />
                
                {/* Clock marks */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30) * Math.PI / 180;
                  const length = i % 3 === 0 ? 14 : 10;
                  const width = i % 3 === 0 ? 2 : 1;
                  const x1 = Math.sin(angle) * 40;
                  const y1 = -Math.cos(angle) * 40;
                  const x2 = Math.sin(angle) * (40 - length);
                  const y2 = -Math.cos(angle) * (40 - length);
                  return (
                    <motion.line
                      key={`mark-${i}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isDarkMode ? "#60A5FA" : "#2563EB"}
                      strokeWidth={width}
                      className={colors.glow}
                    />
                  )
                })}
                
                {/* Numbers on the clock face */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const hour = i === 0 ? 12 : i;
                  const angle = ((i * 30) - 90) * Math.PI / 180;
                  const x = Math.cos(angle) * 30;
                  const y = Math.sin(angle) * 30;
                  
                  // Special handling for 12 o'clock position
                  const isSpecial = hour === 12;
                  return (
                    <motion.text
                      key={`hour-${hour}`}
                      x={x}
                      y={y + 1} // Small adjustment for vertical centering
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fontSize={isSpecial ? "10" : "8"}
                      fontWeight={isSpecial ? "bold" : "normal"}
                      fill={isSpecial ? 
                        (isDarkMode ? "#F97316" : "#DC2626") : 
                        (isDarkMode ? "#60A5FA" : "#2563EB")}
                      className={isSpecial ? "animate-pulse" : ""}
                    >
                      {hour}
                    </motion.text>
                  )
                })}
                
                {/* Hour hand - starts at correct time and makes a full rotation */}
                <motion.line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="-18"
                  stroke={isDarkMode ? "#F97316" : "#2563EB"}
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ rotate: 0 }} // Start at 12 o'clock
                  animate={{ rotate: 360 }} // Make a full rotation
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Minute hand - starts at correct time and makes a full rotation */}
                <motion.line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="-30"
                  stroke={isDarkMode ? "#60A5FA" : "#1D4ED8"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ rotate: 0 }} // Start at 12 o'clock
                  animate={{ rotate: 360 }} // Make a full rotation
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Second hand - starts at correct time and makes a full rotation */}
                <motion.line
                  x1="0"
                  y1="5"
                  x2="0"
                  y2="-35"
                  stroke={isDarkMode ? "#FB923C" : "#DC2626"}
                  strokeWidth="1"
                  strokeLinecap="round"
                  initial={{ rotate: 0 }} // Start at 12 o'clock
                  animate={{ rotate: 360 }} // Make a full rotation
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Center dot */}
                <circle
                  cx="0"
                  cy="0"
                  r="3"
                  fill={isDarkMode ? "#60A5FA" : "#1D4ED8"}
                  className={colors.glow}
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.h2
          className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Welcome to Snigdha's Birthday
        </motion.h2>
        
        {/* Name with floating letters for better mobile compatibility */}
        <motion.div 
          className="relative h-16 mb-8 w-full max-w-xs mx-auto overflow-visible px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex justify-center items-center space-x-1">
            {Array.from("SNIGDHA").map((letter, i) => (
              <motion.div
                key={`loading-letter-${i}`}
                className={`text-3xl font-bold ${
                  isDarkMode 
                    ? 'text-blue-300 filter drop-shadow-[0_0_8px_rgba(186,230,253,0.8)]' 
                    : 'text-blue-500 filter drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]'
                }`}
                animate={{
                  y: [0, -15, 0],
                  rotateY: [0, 180, 360],
                  scale: letter === 'S' || letter === 'G' ? [1, 1.2, 1] : [1, 1.05, 1],
                  filter: isDarkMode ? 
                    ['drop-shadow(0 0 5px rgba(186,230,253,0.4))', 'drop-shadow(0 0 15px rgba(186,230,253,0.8))', 'drop-shadow(0 0 5px rgba(186,230,253,0.4))'] :
                    ['drop-shadow(0 0 2px rgba(96,165,250,0.3))', 'drop-shadow(0 0 8px rgba(96,165,250,0.6))', 'drop-shadow(0 0 2px rgba(96,165,250,0.3))']
                }}
                transition={{
                  duration: letter === 'S' || letter === 'G' ? 3 : 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {letter}
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Loading progress */}
        <motion.div
          className={`mt-4 h-3 w-60 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className={`h-full ${isDarkMode ? 
              'bg-gradient-to-r from-blue-300 via-orange-300 to-blue-300' : 
              'bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300'}`}
            initial={{ width: '0%' }}
            animate={{ 
              width: '100%', 
              background: isDarkMode ? 
                ['linear-gradient(90deg, #60A5FA, #FDBA74, #60A5FA)', 'linear-gradient(90deg, #FDBA74, #60A5FA, #FDBA74)', 'linear-gradient(90deg, #60A5FA, #FDBA74, #60A5FA)'] :
                ['linear-gradient(90deg, #60A5FA, #93C5FD, #60A5FA)', 'linear-gradient(90deg, #93C5FD, #60A5FA, #93C5FD)', 'linear-gradient(90deg, #60A5FA, #93C5FD, #60A5FA)']
            }}
            transition={{ 
              width: { duration: 2.5, ease: "easeInOut" },
              background: { duration: 3, repeat: Infinity }
            }}
          />
        </motion.div>
        
        <motion.p
          className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Creating Snigdha's special birthday celebration...
        </motion.p>

        {/* Developer credit - small at bottom */}
        <motion.div
          className={`absolute bottom-4 right-4 flex items-center space-x-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span>Developed by GTK</span>
          <a 
            href="https://www.instagram.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Instagram size={16} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    );
  } 
  
  // Standard celebration loading animation with enhanced clock animation
  return (
    <div className={`flex flex-col items-center justify-center h-screen overflow-hidden relative ${colors.bg}`}>
      {/* Background animated particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute rounded-full ${isDarkMode ? 'bg-orange-300/30' : 'bg-blue-300/30'}`}
          style={{
            width: Math.random() * 18 + 5,
            height: Math.random() * 18 + 5,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.6, 1],
            filter: isDarkMode ?
              ['blur(0px)', 'blur(2px)', 'blur(0px)'] :
              ['blur(0px)', 'blur(1px)', 'blur(0px)']
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Enhanced clock animation - hands rotate and meet at 12 */}
        <motion.div 
          className="flex items-center justify-center"
        >
          <div className={`w-40 h-40 rounded-full ${isDarkMode ? 'bg-gray-800/80' : 'bg-blue-100/90'} flex items-center justify-center shadow-lg backdrop-blur-sm`}>
            <motion.div
              className="relative w-32 h-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <svg width="100%" height="100%" viewBox="-50 -50 100 100">
                {/* Clock outer circle */}
                <motion.circle
                  cx="0"
                  cy="0"
                  r="45"
                  stroke={isDarkMode ? "#60A5FA" : "#2563EB"}
                  strokeWidth="1"
                  fill="none"
                  className={colors.glow}
                />
                
                {/* Clock marks */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30) * Math.PI / 180;
                  const length = i % 3 === 0 ? 14 : 10;
                  const width = i % 3 === 0 ? 2 : 1;
                  const x1 = Math.sin(angle) * 40;
                  const y1 = -Math.cos(angle) * 40;
                  const x2 = Math.sin(angle) * (40 - length);
                  const y2 = -Math.cos(angle) * (40 - length);
                  return (
                    <motion.line
                      key={`mark-${i}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isDarkMode ? "#60A5FA" : "#2563EB"}
                      strokeWidth={width}
                      className={colors.glow}
                    />
                  )
                })}
                
                {/* Numbers on the clock face - with emphasis on 12 */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const hour = i === 0 ? 12 : i;
                  const angle = ((i * 30) - 90) * Math.PI / 180;
                  const x = Math.cos(angle) * 30;
                  const y = Math.sin(angle) * 30;
                  
                  // Special handling for 12 o'clock position
                  const isSpecial = hour === 12;
                  return (
                    <motion.text
                      key={`hour-${hour}`}
                      x={x}
                      y={y + 1}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fontSize={isSpecial ? "10" : "8"}
                      fontWeight={isSpecial ? "bold" : "normal"}
                      fill={isSpecial ? 
                        (isDarkMode ? "#F97316" : "#DC2626") : 
                        (isDarkMode ? "#60A5FA" : "#2563EB")}
                      className={isSpecial ? "animate-pulse" : ""}
                      animate={isSpecial ? {
                        fillOpacity: [0.7, 1, 0.7],
                        scale: [1, 1.2, 1]
                      } : undefined}
                      transition={isSpecial ? {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      } : undefined}
                    >
                      {hour}
                    </motion.text>
                  )
                })}

                {/* Hour hand - rotate to make full rotation, starting at 9 and ending at 12 */}
                <motion.line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="-20"
                  stroke={isDarkMode ? "#F97316" : "#2563EB"}
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ rotate: -90 }} // Start at 9 o'clock
                  animate={{ rotate: 0 }}   // End at 12 o'clock
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
                
                {/* Minute hand - rotate to make full rotation, starting at 6 and ending at 12 */}
                <motion.line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="-30"
                  stroke={isDarkMode ? "#60A5FA" : "#1D4ED8"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ rotate: -180 }} // Start at 6 o'clock
                  animate={{ rotate: 0 }}    // End at 12 o'clock
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
                
                {/* Second hand - rotate to make full rotation, starting at 3 and ending at 12 */}
                <motion.line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="-35"
                  stroke={isDarkMode ? "#F97316" : "#DC2626"}
                  strokeWidth="1"
                  strokeLinecap="round"
                  initial={{ rotate: 90 }}  // Start at 3 o'clock
                  animate={{ rotate: 0 }}   // End at 12 o'clock
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
                
                {/* After all hands reach 12, animate them */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.2 }}
                >
                  {/* Continuous rotating hour hand */}
                  <motion.line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="-20"
                    stroke={isDarkMode ? "#F97316" : "#2563EB"}
                    strokeWidth="3"
                    strokeLinecap="round"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Continuous rotating minute hand */}
                  <motion.line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="-30"
                    stroke={isDarkMode ? "#60A5FA" : "#1D4ED8"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Continuous rotating second hand */}
                  <motion.line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="-35"
                    stroke={isDarkMode ? "#F97316" : "#DC2626"}
                    strokeWidth="1"
                    strokeLinecap="round"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.g>
                
                {/* Center dot */}
                <circle
                  cx="0"
                  cy="0"
                  r="3"
                  fill={isDarkMode ? "#60A5FA" : "#1D4ED8"}
                  className={colors.glow}
                />
                
                {/* Shine effect when hands meet at 12 */}
                <motion.circle
                  cx="0"
                  cy="0"
                  r="45"
                  fill="none"
                  stroke={isDarkMode ? "#F97316" : "#DC2626"}
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0, 0.8, 0],
                    scale: [0.8, 1.2, 0.8],
                    strokeWidth: [0, 3, 0]
                  }}
                  transition={{ 
                    delay: 3,  
                    duration: 1.5, 
                    repeat: 0,
                    ease: "easeOut"
                  }}
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.h2
        className={`mt-12 text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} text-center`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Loading Snigdha's Birthday Celebration...
      </motion.h2>
      
      {/* Enhanced colorful loading bar */}
      <motion.div
        className={`mt-6 h-3 w-64 rounded-full overflow-hidden relative ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className={`h-full ${isDarkMode ? 
            'bg-gradient-to-r from-blue-300 via-orange-300 to-blue-300' : 
            'bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300'}`}
          initial={{ width: '0%' }}
          animate={{ 
            width: '100%',
            background: isDarkMode ? 
              ['linear-gradient(90deg, #60A5FA, #FDBA74, #60A5FA)', 'linear-gradient(90deg, #FDBA74, #60A5FA, #FDBA74)', 'linear-gradient(90deg, #60A5FA, #FDBA74, #60A5FA)'] :
              ['linear-gradient(90deg, #60A5FA, #93C5FD, #60A5FA)', 'linear-gradient(90deg, #93C5FD, #60A5FA, #93C5FD)', 'linear-gradient(90deg, #60A5FA, #93C5FD, #60A5FA)']
          }}
          transition={{ 
            width: { duration: 2.5, ease: "easeInOut" },
            background: { duration: 3, repeat: Infinity }
          }}
        />
        
        {/* Little particles on the loading bar */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`particle-bar-${i}`}
            className={`absolute top-0 h-full w-1 rounded-full ${isDarkMode ? 'bg-white/30' : 'bg-white/70'}`}
            style={{
              left: `${10 + i * 15}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              height: ['30%', '100%', '30%'],
              y: ['30%', '0%', '30%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Developer credit - small at bottom */}
      <motion.div
        className={`absolute bottom-4 right-4 flex items-center space-x-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span>Developed by GTK</span>
        <a 
          href="https://www.instagram.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <Instagram size={16} />
          </motion.div>
        </a>
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;
