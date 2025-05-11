
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, SkipForward, Sparkles, VolumeX, Volume2, Pause } from 'lucide-react';
import { createConfetti, burstConfetti } from '@/lib/confetti';
import { ColorTheme } from '@/pages/Index';

interface IntroVideoProps {
  onComplete: () => void;
  videoSrc: string;
  colorTheme: ColorTheme;
  gender: 'male' | 'female' | undefined;
}

export default function IntroVideo({ onComplete, videoSrc, colorTheme, gender }: IntroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // This would be replaced with a real video source
  const placeholderVideo = videoSrc || "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoaded(true);
      // Auto-play when loaded
      video.play().catch(err => {
        console.error('Auto-play failed', err);
        setIsPlaying(false);
      });
    };

    const handleEnded = () => {
      createConfetti({
        particleCount: 200,
        spread: 90,
        origin: { x: 0.5, y: 0.5 }
      });
      setTimeout(() => {
        onComplete();
      }, 1000);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);

    // Trigger sparkles animation at intervals
    const sparkleInterval = setInterval(() => {
      if (isPlaying) {
        setShowSparkles(true);
        setTimeout(() => setShowSparkles(false), 1500);
      }
    }, 4000);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      clearInterval(sparkleInterval);
    };
  }, [onComplete, isPlaying]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        burstConfetti(3, 500);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSkip = () => {
    createConfetti({
      particleCount: 100,
      spread: 80,
      origin: { x: 0.5, y: 0.5 }
    });
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  // Get theme-specific color classes
  const getThemeColor = () => {
    switch (colorTheme) {
      case 'pink':
        return 'bg-pink-500 hover:bg-pink-600';
      case 'purple':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'green':
        return 'bg-green-500 hover:bg-green-600';
      case 'orange':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'blue':
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <motion.div 
      className="relative w-full max-w-4xl mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="glass-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="aspect-video relative overflow-hidden">
          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            src={placeholderVideo}
          />
          
          {/* Floating Sparkles */}
          <AnimatePresence>
            {showSparkles && (
              <>
                <motion.div
                  className="absolute top-1/4 left-1/4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: [0.8, 1.2, 0.8] }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  <Sparkles className="h-10 w-10 text-yellow-300" />
                </motion.div>
                <motion.div
                  className="absolute top-1/3 right-1/4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: [0.8, 1.2, 0.8] }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                >
                  <Sparkles className="h-8 w-8 text-amber-400" />
                </motion.div>
                <motion.div
                  className="absolute bottom-1/4 right-1/3"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: [0.8, 1.2, 0.8] }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                >
                  <Sparkles className="h-12 w-12 text-yellow-400" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
          
          <div className="absolute bottom-4 left-4 z-10">
            <Button 
              onClick={handlePlayPause} 
              size="icon" 
              className="rounded-full w-12 h-12 button-hover bg-white/80 dark:bg-black/80 text-black dark:text-white"
              disabled={!isLoaded}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </motion.div>
            </Button>
          </div>
        </div>

        <div className="p-6 flex justify-between items-center">
          <h2 className={`text-xl font-semibold bg-gradient-to-r from-${colorTheme === 'blue' ? 'blue' : colorTheme}-500 to-purple-600 bg-clip-text text-transparent`}>
            {gender === 'male' ? 'His' : gender === 'female' ? 'Her' : 'Your'} Birthday Celebration
          </h2>
          <Button 
            variant="outline" 
            onClick={handleSkip}
            className="button-hover"
          >
            <SkipForward className="mr-2 h-4 w-4" />
            Skip Intro
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
