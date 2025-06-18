import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type MemoryItem = 
  | { type: 'image'; src: string; alt?: string; title?: string }
  | { type: 'video'; src: string; poster?: string; title?: string };

interface SpecialMemoriesSlideshowProps {
  memories: MemoryItem[];
  autoPlay?: boolean;
  interval?: number;
  isDarkMode?: boolean;
}

export default function SpecialMemoriesSlideshow({
  memories,
  autoPlay = true,
  interval = 2000,
  isDarkMode = false
}: SpecialMemoriesSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const slideshowRef = useRef<HTMLDivElement>(null);

  // Preload images and posters
  useEffect(() => {
    memories.forEach(memory => {
      if (memory.type === 'image') {
        const img = new window.Image();
        img.src = memory.src;
      } else if (memory.type === 'video' && memory.poster) {
        const img = new window.Image();
        img.src = memory.poster;
      }
    });
  }, [memories]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(() => {
      handleNext();
    }, interval);
    return () => clearTimeout(timer);
  }, [currentIndex, autoPlay, interval]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
    setIsMediaLoaded(false);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % memories.length);
    setIsMediaLoaded(false);
  };

  const currentMemory = memories[currentIndex];

  // Styles
  const containerBg = isDarkMode
    ? "bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-800"
    : "bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-50";

  const borderGradient = isDarkMode
    ? "border-2 border-blue-300/50"
    : "border-2 border-blue-200/40";

  const shadowStyle = isDarkMode
    ? "shadow-[0_12px_40px_-4px_rgba(186,230,253,0.3)]"
    : "shadow-[0_12px_40px_-4px_rgba(59,130,246,0.12)]";

  const getContainerClasses = () => [
    "relative overflow-hidden rounded-2xl mx-auto w-full",
    "h-[320px] sm:h-[400px] md:h-[550px] lg:h-[700px]",
    containerBg, borderGradient, shadowStyle,
    "transition-all duration-300"
  ].join(' ');

  const getMediaClasses = () => [
    "object-contain rounded-xl shadow-lg mx-auto select-none",
    "w-full h-full",
    "max-h-[230px] sm:max-h-[330px] md:max-h-[440px] lg:max-h-[600px]",
  ].join(' ');

  return (
    <div className="w-full max-w-3xl md:max-w-5xl mx-auto px-1 sm:px-2 md:px-4">
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="text-center mb-4 sm:mb-5"
      >
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
          isDarkMode ? 'text-blue-200' : 'text-blue-700'
        } mb-1 flex items-center justify-center gap-2 sm:gap-3`}>
          <Heart className={`h-7 w-7 ${isDarkMode ? 'text-blue-300' : 'text-blue-400'}`} />
          Special Memories
          <Heart className={`h-7 w-7 ${isDarkMode ? 'text-blue-300' : 'text-blue-400'}`} />
        </h2>
        <p className={`${isDarkMode ? 'text-blue-100' : 'text-gray-500'} text-sm sm:text-lg`}>
          Beautiful moments captured in time
        </p>
      </motion.div>

      {/* Slideshow */}
      <motion.div
        ref={slideshowRef}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={getContainerClasses()}
        style={{
          perspective: '1200px',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{
              opacity: 0,
              scale: 0.97,
              x: direction > 0 ? 110 : -110,
              rotateY: direction > 0 ? -12 : 12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              rotateY: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.97,
              x: direction > 0 ? -110 : 110,
              rotateY: direction > 0 ? 12 : -12,
            }}
            transition={{
              duration: 0.55,
              type: "spring",
              stiffness: 104,
              damping: 17,
            }}
            className="absolute inset-0 w-full h-full flex items-center justify-center p-2 sm:p-4 md:p-6"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Loader */}
              {!isMediaLoaded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-xl z-10"
                >
                  <svg
                    className="animate-spin h-12 w-12 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                </motion.div>
              )}

              {/* Media */}
              {currentMemory.type === 'image' ? (
                <img
                  src={currentMemory.src}
                  alt={currentMemory.alt || `Memory ${currentIndex + 1}`}
                  className={getMediaClasses()}
                  loading="eager"
                  onLoad={() => setIsMediaLoaded(true)}
                  draggable={false}
                />
              ) : (
                <video
                  src={currentMemory.src}
                  poster={currentMemory.poster}
                  className={getMediaClasses()}
                  autoPlay
                  muted
                  playsInline
                  loop
                  onLoadedData={() => setIsMediaLoaded(true)}
                  draggable={false}
                />
              )}

              {/* Title overlay */}
              {currentMemory.title && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className={`absolute bottom-2 left-2 right-2 text-center p-2 rounded-md ${
                    isDarkMode
                      ? 'bg-black/60 text-white'
                      : 'bg-white/80 text-gray-800'
                  } backdrop-blur-sm`}
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                    {currentMemory.title}
                  </h3>
                </motion.div>
              )}
            </div>

            {/* Decorative sparkles */}
            <motion.div
              className="absolute top-5 right-6 pointer-events-none"
              animate={{
                scale: [1, 1.17, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className={`w-6 h-6 ${
                isDarkMode ? 'text-blue-200' : 'text-blue-400'
              }`}>
                ✨
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 sm:gap-7 z-20">
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}>
            <Button
              variant="outline"
              size="lg"
              aria-label="Previous memory"
              className={`rounded-full w-12 h-12 sm:w-14 sm:h-14 ${
                isDarkMode
                  ? 'bg-blue-900/70 border-blue-200/60 text-blue-100 hover:bg-blue-800/90 hover:border-blue-200'
                  : 'bg-white/90 border-blue-200/60 text-blue-700 hover:bg-blue-100 hover:border-blue-300'
              } shadow-md backdrop-blur-sm transition-all duration-300`}
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}>
            <Button
              variant="outline"
              size="lg"
              aria-label="Next memory"
              className={`rounded-full w-12 h-12 sm:w-14 sm:h-14 ${
                isDarkMode
                  ? 'bg-blue-900/70 border-blue-200/60 text-blue-100 hover:bg-blue-800/90 hover:border-blue-200'
                  : 'bg-white/90 border-blue-200/60 text-blue-700 hover:bg-blue-100 hover:border-blue-300'
              } shadow-md backdrop-blur-sm transition-all duration-300`}
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
