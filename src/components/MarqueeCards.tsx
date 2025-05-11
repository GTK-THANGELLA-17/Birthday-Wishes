import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type MediaItem } from './EnhancedCarousel';

interface MarqueeCardsProps {
  images: MediaItem[];
  isDarkMode?: boolean;
}

export default function MarqueeCards({ images, isDarkMode = false }: MarqueeCardsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = prevIndex + direction;
        if (nextIndex >= images.length - 1) {
          setDirection(-1);
          return images.length - 1;
        } else if (nextIndex <= 0) {
          setDirection(1);
          return 0;
        }
        return nextIndex;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images.length, direction]);
  
  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
    setDirection(index > currentImageIndex ? 1 : -1);
  };

  const currentItem = images[currentImageIndex];
  const angle = 15; // Maximum rotation angle

  return (
    <div className="w-full mb-8 relative perspective">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, rotateY: direction > 0 ? -angle : angle, scale: 0.9, z: -100 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1, z: 0 }}
          exit={{ opacity: 0, rotateY: direction > 0 ? angle : -angle, scale: 0.9, z: -100 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-full h-60 sm:h-80 md:h-96 rounded-xl overflow-hidden preserve-3d shadow-xl"
          style={{ 
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            boxShadow: isDarkMode 
              ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' 
              : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div className="w-full h-full relative">
            {currentItem.type === 'image' ? (
              <img 
                src={currentItem.src}
                alt={currentItem.alt || "Birthday celebration"}
                className="w-full h-full object-contain"
              />
            ) : (
              <video
                className="w-full h-full object-contain"
                poster={currentItem.poster}
                autoPlay
                loop
                muted
              >
                <source src={currentItem.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            
            <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-t ${
              isDarkMode 
                ? 'from-black/40 to-transparent' 
                : 'from-black/20 to-transparent'
            }`}></div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentImageIndex 
                ? isDarkMode ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)]' 
                : isDarkMode ? 'bg-white/30' : 'bg-white/50'
            }`}
            whileHover={{ scale: 1.3 }}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
      
      <div className="absolute -left-4 -right-4 -bottom-4 -top-4 pointer-events-none opacity-0"></div>
    </div>
  );
}
