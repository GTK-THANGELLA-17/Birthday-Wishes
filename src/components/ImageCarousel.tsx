
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
  const maxRotation = 10; // Subtle rotation for beautiful effect

  // Preload images for smooth display, especially for large images
  useEffect(() => {
    images.forEach(item => {
      if (item.type === 'image') {
        const img = new window.Image();
        img.src = item.src;
      }
    });
  }, [images]);

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
    setTimeout(() => setIsPaused(false), 1200);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1200);
  };

  const currentItem = images[currentIndex];

  // GIRL THEME: Pink/purple gradients, soft shadows, rounded corners
  const beautifulBg = isDarkMode
    ? "bg-gradient-to-br from-pink-800 via-fuchsia-700/60 to-purple-800"
    : "bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100";

  const boxShadow = isDarkMode
    ? "shadow-[0_6px_32px_0_rgba(236,72,153,0.40)]"
    : "shadow-[0_8px_32px_0_rgba(236,72,153,0.20)]";

  return (
    <div 
      ref={carouselRef}
      className={`relative overflow-hidden rounded-3xl w-full max-w-2xl mx-auto h-[420px] md:h-[540px] ${beautifulBg} ${boxShadow} border-2 border-pink-200/30`}
      style={{
        perspective: '1000px',
        borderRadius: 32,
        background:
          isDarkMode
            ? 'linear-gradient(135deg, #9d174d 0%, #c026d3 60%, #581c87 100%)'
            : 'linear-gradient(135deg, #fce7f3 0%, #f5c2e7 60%, #e9d5ff 100%)',
        transition: 'background 0.5s'
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ 
            opacity: 0, 
            scale: 0.98,
            x: direction > 0 ? 90 : -90,
            rotateZ: direction > 0 ? -maxRotation : maxRotation,
            z: -10
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: 0,
            rotateZ: 0,
            z: 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.98,
            x: direction > 0 ? -90 : 90,
            rotateZ: direction > 0 ? maxRotation : -maxRotation,
            z: -10
          }}
          transition={{ duration: 0.9, type: "spring", stiffness: 80, damping: 18, mass: 0.5 }}
          className="absolute inset-0 w-full h-full flex items-center justify-center z-10"
          style={{ pointerEvents: "none" /* prevent accidental interaction during transition */ }}
        >
          <div className="w-full h-full flex items-center justify-center relative overflow-hidden select-none">
            {currentItem.type === 'image' ? (
              <img
                src={currentItem.src}
                alt={currentItem.alt || 'Carousel image'}
                className="max-w-full max-h-full object-contain object-center rounded-2xl shadow-lg saturate-125 bg-white/50"
                loading="eager"
                style={{
                  width: '90%',
                  height: '88%',
                  margin: 'auto',
                  boxShadow: isDarkMode
                    ? "0 4px 32px 0 rgba(244,114,182,0.37)"
                    : "0 8px 32px 0 rgba(236,72,153,0.17)"
                }}
                draggable={false}
              />
            ) : (
              <video
                className="max-w-full max-h-full rounded-2xl shadow-lg"
                poster={currentItem.poster}
                autoPlay
                loop
                muted
                style={{
                  width: '92%',
                  height: '86%',
                  margin: 'auto',
                  background: isDarkMode ? "#131313" : "#fff6fc"
                }}
              >
                <source src={currentItem.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <motion.div
              className="absolute inset-0 pointer-events-none bg-gradient-to-b via-transparent to-white/50 dark:to-fuchsia-950/70"
              initial={{ opacity: 0.1 }}
              animate={{ opacity: 0.15 }}
              style={{
                borderRadius: 'inherit'
              }}
            />
            {/* Subtle glow or sparkle overlays for girl theme */}
            <motion.div
              className="absolute top-3 right-5 z-50 pointer-events-none"
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.2, 0.09] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse" }}
            >
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" fill="#f472b6" fillOpacity="0.14" />
                <circle cx="12" cy="12" r="5" fill="#c026d3" fillOpacity="0.09" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* BUTTONS ONLY, bottom centered */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-8 z-20">
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous"
          className={`rounded-full p-1 md:p-2 bg-white/90 dark:bg-fuchsia-900/70 text-pink-700 dark:text-pink-300 
          hover:bg-pink-100 dark:hover:bg-fuchsia-900 shadow-xl border-pink-200/70 dark:border-fuchsia-900/60 transition-all duration-200`}
          onClick={handlePrev}
        >
          <ChevronLeft className="h-7 w-7" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Next"
          className={`rounded-full p-1 md:p-2 bg-white/90 dark:bg-fuchsia-900/70 text-pink-700 dark:text-pink-300 
          hover:bg-pink-100 dark:hover:bg-fuchsia-900 shadow-xl border-pink-200/70 dark:border-fuchsia-900/60 transition-all duration-200`}
          onClick={handleNext}
        >
          <ChevronRight className="h-7 w-7" />
        </Button>
      </div>
      {/* Decorative corner (optional, for even more girl-themed look) */}
      <motion.div
        className="absolute -left-12 -top-12 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: isDarkMode
            ? "radial-gradient(circle at 30% 40%, #f472b655 50%, transparent 100%)"
            : "radial-gradient(circle at 55% 55%, #fdcfe8 70%, transparent 90%)"
        }}
        animate={{ scale: [1.2, 1.1, 1.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
}
