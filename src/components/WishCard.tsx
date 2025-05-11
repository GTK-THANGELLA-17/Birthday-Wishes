
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Instagram, Share2 } from 'lucide-react';
import SharingButtons from './SharingButtons';
import VoiceMessage from './VoiceMessage';
import { Button } from './ui/button';

interface WishCardProps {
  name: string;
  wishes: string[];
  isDarkMode: boolean;
  photoUrl?: string;
  voiceMessageRef?: React.RefObject<HTMLButtonElement>;
}

export default function WishCard({ name, wishes, isDarkMode, photoUrl, voiceMessageRef }: WishCardProps) {
  const [selectedWish] = React.useState(() => {
    // Randomly select one wish from the array
    return wishes[Math.floor(Math.random() * wishes.length)];
  });
  
  const [voiceGender, setVoiceGender] = React.useState<'male' | 'female'>('female');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleVoiceGenderChange = (gender: 'male' | 'female') => {
    setVoiceGender(gender);
  };

  // Replace "Thangella" with "Snigdha" in the wish message
const wishMessage = `Dear ${name},

Wishing you the happiest of birthdays! Your energy, kindness, and amazing spirit make every moment brighter.

I hope today brings you joy, laughter, and all the wonderful things you truly deserve. Here's to many more great moments ahead!

${selectedWish}

"Wishing you a day filled with joy 😄, laughter 😂, cake 🍰, and unforgettable moments 🌟 that become cherished memories 🥳💖! May your heart be full of happiness 💫 and your day be as sweet as you are 🍭🎂!`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      whileHover={{ 
        y: -5,
        boxShadow: isDarkMode 
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" 
          : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: { duration: 0.3 }
      }}
    >
      <Card 
        ref={cardRef}
        className={`overflow-hidden transform transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-900/80 border-gray-800 shadow-[0_4px_20px_rgba(186,230,253,0.15)]' 
            : 'bg-white/90 border-gray-200'
        }`}
        style={{
          transform: 'perspective(1000px)',
          transformStyle: 'preserve-3d',
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1], color: isDarkMode ? ['#93C5FD', '#FB923C', '#93C5FD'] : undefined }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Heart className={`h-6 w-6 ${isDarkMode ? 'text-blue-300 filter drop-shadow-[0_0_8px_rgba(186,230,253,0.7)]' : 'text-blue-500'}`} />
            </motion.div>
            <span>Birthday Wishes</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            {photoUrl && (
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <motion.div 
                  className="relative w-16 h-16 mx-auto md:mx-0 overflow-hidden rounded-md border-2 border-blue-300 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img 
                    src={photoUrl} 
                    alt={`${name}'s photo`}
                    className="w-full h-full object-cover"
                    initial={{ filter: 'blur(5px)', scale: 1.2 }}
                    animate={{ filter: 'blur(0px)', scale: 1 }}
                    transition={{ duration: 1 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent"
                    animate={{ 
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center md:text-left flex-grow"
            >
              <motion.p 
                className={`text-xl font-birthday ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                Dear {name},
              </motion.p>
              
              <motion.p 
                className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                🎉 Wishing you a birthday that marks not just another year, but a step forward into something bigger and brighter. 🌟✨

Finishing your 12th with such strong results is no small thing — it speaks volumes about your focus, effort, and mindset. 💪📚 Big brain energy! 🧠💯
And now, stepping into Graduation, you're entering a new phase that’s going to challenge you, shape you, and push you to grow in ways you haven’t even imagined yet. 🚀🎓

You're sharp, determined, and not afraid to stand your ground. 💥 You’ve got a style that’s your own — a bit of mischief 😏, a quick temper maybe 🔥, but also a mindset that doesn’t quit. That’s rare, and it’s something to be . 🦋 You’re like a tiny hurricane with a heart of gold. 🌪️

What’s ahead won’t always be easy. But you’ve already shown that pressure doesn’t scare you — it sharpens you. 💎 Keep that edge. Keep questioning, building, improving. 🛠️🧠 The path you’re on is yours to define, and you have everything it takes to make it something remarkable. 🌈🌻

May this year bring moments that challenge you in the right ways, people who get you 💫, and opportunities that push your limits.
And yes — plenty of laughter 🤭, unexpected wins 🥳, and good cake too 🎂🍰.

You’re just getting started, and there’s so much to look forward to. 🥰🌟;
              </motion.p>
              
              <motion.div 
                className="my-6 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [0.8, 1, 1],
                  opacity: 1,
                  y: [0, -5, 0]
                }}
                transition={{ 
                  scale: { delay: 0.6, duration: 0.8 },
                  y: { delay: 1.4, duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <p className={`text-xl font-bold ${
                  isDarkMode 
                    ? 'text-blue-300 filter drop-shadow-[0_0_8px_rgba(186,230,253,0.5)]' 
                    : 'text-blue-600'
                }`}>
                  {selectedWish}
                </p>
                
                {/* Decorative elements for the card */}
                {isDarkMode && (
                  <motion.div
                    className="absolute -bottom-4 left-0 right-0 h-1 rounded-full mx-auto"
                    style={{
                      width: '60%',
                      background: 'linear-gradient(90deg, rgba(186,230,253,0) 0%, rgba(186,230,253,0.5) 50%, rgba(186,230,253,0) 100%)',
                      filter: 'blur(4px)'
                    }}
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
            <VoiceMessage 
              message={wishMessage}
              isDarkMode={isDarkMode}
              voiceGender={voiceGender}
              onVoiceGenderChange={handleVoiceGenderChange}
              buttonRef={voiceMessageRef}
            />
            
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className={`flex items-center gap-2 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''
                  }`}
                  onClick={() => setShowShareOptions(!showShareOptions)}
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </motion.div>
              
              <AnimatePresence>
                {showShareOptions && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SharingButtons
                      elementRef={cardRef}
                      filename={`${name}-birthday-wish`}
                      title="Birthday Wishes"
                      isDarkMode={isDarkMode}
                      includeWhatsapp={true}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
        
        {/* Developer credit with Instagram link - Updated profile URL */}
        <div className={`px-6 pb-3 flex items-center justify-end space-x-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <span>Developed by GTK</span>
          <a 
            href="https://www.instagram.com/g_thangella_k?igsh=aWczdnVtaDR1N280" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Instagram size={14} />
            </motion.div>
          </a>
        </div>
      </Card>
    </motion.div>
  );
}
