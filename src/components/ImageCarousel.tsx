import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type MediaItem } from './EnhancedCarousel';

interface ImageCarouselProps {
  images: MediaItem[];
  autoPlay?: boolean;
  interval?: number;
  isDarkMode?: boolean;
}

export default function ImageCarousel({ 
  images, 
  autoPlay = true, 
  interval = 5000,
  isDarkMode = false
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const carouselRef = useRef<HTMLDivElement>(null);

  // 3D effect variables
  const maxRotation = 15; // Increased rotation for more pronounced 3D effect

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying && !isPaused) {
      timer = setTimeout(() => {
        handleNext();
      }, interval);
    }
    return () => clearTimeout(timer);
  }, [currentIndex, isPlaying, isPaused, interval]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  const currentItem = images[currentIndex];

  return (
    <div 
      ref={carouselRef}
      className="relative overflow-hidden rounded-xl w-full h-60 sm:h-80 md:h-96 shadow-lg perspective preserve-3d"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ 
            opacity: 0, 
            rotateY: direction > 0 ? -maxRotation : maxRotation,
            scale: 0.9,
            z: -50 
          }}
          animate={{ 
            opacity: 1, 
            rotateY: 0,
            scale: 1,
            z: 0 
          }}
          exit={{ 
            opacity: 0, 
            rotateY: direction > 0 ? maxRotation : -maxRotation,
            scale: 0.9,
            z: -50 
          }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="w-full h-full preserve-3d"
          style={{ 
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="w-full h-full flex items-center justify-center bg-black/5 dark:bg-black/20">
            {currentItem.type === 'image' ? (
              <img
                src={currentItem.src}
                alt={currentItem.alt || 'Carousel image'}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            ) : (
              <video
                className="max-w-full max-h-full object-contain"
                poster={currentItem.poster}
                autoPlay
                loop
                muted
              >
                <source src={currentItem.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex 
                ? isDarkMode ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)]'
                : isDarkMode ? 'bg-white/30' : 'bg-white/50'
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 text-black hover:bg-white/90 dark:bg-black/70 dark:text-white dark:hover:bg-black/90 rounded-full p-1 z-10"
        onClick={handlePrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 text-black hover:bg-white/90 dark:bg-black/70 dark:text-white dark:hover:bg-black/90 rounded-full p-1 z-10"
        onClick={handleNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
