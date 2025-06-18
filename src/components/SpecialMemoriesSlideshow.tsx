import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type MemoryItem = {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  title?: string;
  poster?: string; // for video
};

interface SlideshowProps {
  memories: MemoryItem[];
  autoPlay?: boolean;
  interval?: number;
  isDarkMode?: boolean;
}

export default function SpecialMemoriesSlideshow({
  memories,
  autoPlay = true,
  interval = 2500,
  isDarkMode = false,
}: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loaded, setLoaded] = useState(false);

  const timer = useRef<NodeJS.Timeout | null>(null);

  // Preload all images once on mount
  useEffect(() => {
    memories.forEach(item => {
      if (item.type === 'image' || (item.type === 'video' && item.poster)) {
        const img = new Image();
        img.src = item.type === 'image' ? item.src : item.poster!;
      }
    });
  }, [memories]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay) return;
    timer.current = setTimeout(() => {
      next();
    }, interval);
    return () => clearTimeout(timer.current!);
  }, [index, autoPlay, interval]);

  const next = () => {
    setDirection(1);
    setIndex(prev => (prev + 1) % memories.length);
    setLoaded(false);
  };

  const prev = () => {
    setDirection(-1);
    setIndex(prev => (prev - 1 + memories.length) % memories.length);
    setLoaded(false);
  };

  const item = memories[index];

  const bgGradient = isDarkMode
    ? "bg-gradient-to-br from-slate-800 via-slate-900 to-black"
    : "bg-gradient-to-br from-blue-100 via-blue-50 to-white";

  return (
    <div className="max-w-4xl mx-auto px-2">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 className={`text-3xl font-bold flex items-center justify-center gap-3 ${isDarkMode ? 'text-blue-100' : 'text-blue-700'}`}>
          <Heart className={`h-7 w-7 ${isDarkMode ? 'text-blue-200' : 'text-blue-500'}`} />
          Special Memories
          <Heart className={`h-7 w-7 ${isDarkMode ? 'text-blue-200' : 'text-blue-500'}`} />
        </h2>
      </motion.div>

      {/* Slideshow Container */}
      <div className={`relative overflow-hidden rounded-xl ${bgGradient} border border-blue-300/40 shadow-xl mx-auto`}
        style={{
          width: '100%',
          maxWidth: '100%',
          aspectRatio: '16 / 9', // or you can use fixed height
          minHeight: '320px'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              x: direction > 0 ? 100 : -100,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: direction > 0 ? -100 : 100,
              scale: 0.98,
            }}
            transition={{
              duration: 0.6,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Loader Overlay */}
            {!loaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10 rounded-xl"
              >
                <svg
                  className="animate-spin h-12 w-12 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
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
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt={item.alt || `Memory ${index + 1}`}
                onLoad={() => setLoaded(true)}
                className="max-h-full max-w-full object-contain rounded-xl select-none"
                draggable={false}
              />
            ) : (
              <video
                src={item.src}
                poster={item.poster}
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={() => setLoaded(true)}
                className="max-h-full max-w-full object-contain rounded-xl select-none"
              />
            )}

            {/* Optional Title */}
            {item.title && loaded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute bottom-4 left-4 right-4 bg-black/50 text-white text-center py-2 rounded"
              >
                <p>{item.title}</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav Buttons */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-6 z-20">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            className="rounded-full backdrop-blur-sm bg-white/70 hover:bg-white shadow"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            className="rounded-full backdrop-blur-sm bg-white/70 hover:bg-white shadow"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
