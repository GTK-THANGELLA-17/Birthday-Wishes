
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define the MediaItem type consistently across components
export type MediaItem = 
  | { type: 'image'; src: string; alt?: string; } 
  | { type: 'video'; src: string; poster?: string; };

interface EnhancedCarouselProps {
  media: MediaItem[];
  autoPlay?: boolean;
  interval?: number;
  isDarkMode?: boolean;
}

export default function EnhancedCarousel({ 
  media, 
  autoPlay = true, 
  interval = 2000, // Changed to 2 seconds as requested
  isDarkMode = false
}: EnhancedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Initialize video refs array based on media items
  useEffect(() => {
    videoRefs.current = media.map((_, i) => videoRefs.current[i] || null);
  }, [media]);

  // Auto-advance carousel if playing
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying && !isPaused) {
      timer = setTimeout(() => {
        handleNext();
      }, interval);
    }
    return () => clearTimeout(timer);
  }, [currentIndex, isPlaying, isPaused, interval]);

  // Pause currently playing videos when advancing
  useEffect(() => {
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        if (index === currentIndex) {
          // Try to play the current video
          videoRef.play().catch(err => console.error("Video play error:", err));
        } else {
          // Pause other videos
          videoRef.pause();
        }
      }
    });
  }, [currentIndex]);

  const handlePrev = () => {
    pauseCurrentVideo();
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  const handleNext = () => {
    pauseCurrentVideo();
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    
    pauseCurrentVideo();
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  const pauseCurrentVideo = () => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.pause();
    }
  };

  const currentItem = media[currentIndex];
  const maxRotation = 15; // Always use 3D effect as requested

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
            rotateY: (direction > 0 ? -maxRotation : maxRotation),
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
            rotateY: (direction > 0 ? maxRotation : -maxRotation),
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
                ref={el => {
                  videoRefs.current[currentIndex] = el;
                  // Attempt to play when component mounts
                  if (el) {
                    el.play().catch(err => console.error("Video autoplay failed:", err));
                  }
                }}
                className="max-w-full max-h-full object-contain"
                poster={currentItem.poster}
                autoPlay
                loop
                muted
                playsInline
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
        {media.map((_, index) => (
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
