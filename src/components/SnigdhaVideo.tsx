
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Loader, PlayCircle, PauseCircle, SkipForward } from 'lucide-react';
import AudioController from './AudioController';

interface SnigdhaVideoProps {
  onComplete: () => void;
  isDarkMode: boolean;
  autoTransition?: boolean;
}

export default function SnigdhaVideo({ onComplete, isDarkMode, autoTransition = true }: SnigdhaVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isBuffering, setIsBuffering] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Auto play video when component mounts
  useEffect(() => {
    const playVideo = async () => {
      try {
        if (videoRef.current) {
          await videoRef.current.play();
          setIsPlaying(true);
          
          // Hide buffering after video starts playing
          videoRef.current.onplaying = () => {
            setIsBuffering(false);
          };
          
          // Show buffering if video is waiting for more data
          videoRef.current.onwaiting = () => {
            setIsBuffering(true);
          };
          
          // Update progress and auto-transition when video ends
          videoRef.current.ontimeupdate = () => {
            if (videoRef.current) {
              const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
              setProgress(currentProgress);
              
              // Auto transition when video ends
              if (videoRef.current.ended && autoTransition) {
                onComplete();
              }
            }
          };
        }
      } catch (err) {
        console.error("Error playing video:", err);
        setIsPlaying(false);
        setIsBuffering(false);
      }
    };
    
    playVideo();
    
    // Cleanup
    return () => {
      if (videoRef.current) {
        videoRef.current.onplaying = null;
        videoRef.current.onwaiting = null;
        videoRef.current.ontimeupdate = null;
      }
    };
  }, [onComplete, autoTransition]);
  
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };
  
  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full relative rounded-xl overflow-hidden shadow-xl"
      >
        <div className={`aspect-video w-full relative overflow-hidden rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-black'}`}>
          {/* Enhanced buffering indicator with 3D animations */}
          {isBuffering && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/30">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <Loader className={`h-12 w-12 ${isDarkMode ? 'text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]' : 'text-pink-500'}`} />
              </motion.div>
              
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-16 text-white text-lg font-medium"
              >
                Loading Thangella's birthday video...
              </motion.p>
              
              {/* 3D Birthday letters animation during buffering */}
              <motion.div className="mt-8 flex space-x-3">
                {Array.from("BIRTHDAY").map((letter, i) => (
                  <motion.span
                    key={`buffer-letter-${i}`}
                    className={`text-xl font-bold ${
                      isDarkMode 
                        ? 'text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]' 
                        : 'text-pink-300'
                    }`}
                    animate={{
                      y: [0, -15, 0],
                      scale: [1, 1.2, 1],
                      rotateY: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          )}
          
          <video
            ref={videoRef}
            className="w-full h-full object-contain intro-video"
            controls={false}
            autoPlay
            playsInline
            loop={false}
            src="https://media.bensound.com/bensound-video.mp4"  // Replace with actual video URL
          />
          
          {/* Enhanced progress bar with glow effect */}
          <div className="absolute bottom-14 left-0 right-0 h-1 bg-gray-700/50 overflow-hidden">
            <motion.div 
              className={`h-full ${isDarkMode ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500' : 'bg-pink-500'}`}
              style={{ width: `${progress}%` }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
            {isDarkMode && (
              <motion.div 
                className="absolute top-0 bottom-0 w-10 bg-white/30 blur-sm"
                style={{ 
                  left: `${progress-5}%`,
                  filter: 'blur(4px)'
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={togglePlayPause}
                className={`rounded-full ${isDarkMode ? 'bg-gray-800/80 border-gray-700 text-white hover:bg-gray-700/80' : 'bg-white/80 text-gray-900 hover:bg-white/90'} hover:scale-105 transition-transform`}
              >
                {isPlaying ? (
                  <PauseCircle className="h-5 w-5" />
                ) : (
                  <PlayCircle className="h-5 w-5" />
                )}
              </Button>
              
              <AudioController 
                isIntro={true}
                isDarkMode={isDarkMode}
                autoPlay={false}
              />
            </div>
            
            <Button
              variant="outline"
              onClick={handleSkip}
              className={`btn-edge-effect ${isDarkMode ? 'bg-gray-800/80 border-gray-700 text-white hover:bg-gray-700/80' : 'bg-white/80 text-gray-900 hover:bg-white/90'} hover:scale-105 transition-transform`}
            >
              <SkipForward className="h-4 w-4 mr-2" />
              Skip Intro
            </Button>
          </div>

          {/* 3D floating hearts and birthday elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Floating hearts */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute"
                style={{
                  left: `${80 + Math.random() * 15}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 0.7, 1],
                  y: [0, -100, -200],
                  x: [0, -20, -40],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: i * 2,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5 12.572L12 20L4.5 12.572C3.25 11.335 2.5 9.709 2.5 8C2.5 4.962 4.962 2.5 8 2.5C9.716 2.5 11.255 3.249 12.353 4.47C13.453 3.251 14.991 2.5 16.5 2.5C19.538 2.5 22 4.962 22 8C22 9.709 21.75 11.335 20.5 12.572H19.5Z" 
                    fill={isDarkMode ? "rgba(236, 72, 153, 0.5)" : "rgba(236, 72, 153, 0.7)"} 
                  />
                </svg>
              </motion.div>
            ))}
            
            {/* Sparkle Effects */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className={`absolute rounded-full ${
                  isDarkMode ? 'bg-pink-400/30' : 'bg-pink-500/30'
                }`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  filter: isDarkMode ? 'blur(1px)' : 'none'
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-6 text-center"
      >
        <motion.p 
          className={`text-lg ${isDarkMode ? 'text-gray-300 font-birthday' : 'text-gray-600 font-birthday'}`}
          animate={{ 
            scale: [1, 1.05, 1],
            y: [0, -3, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            textShadow: isDarkMode ? '0 0 8px rgba(236,72,153,0.5)' : 'none'
          }}
        >
          A special birthday message for Thangella...
        </motion.p>
      </motion.div>
      
      {/* CSS for enhanced video effects */}
      <style>
        {`
        .intro-video {
          border-radius: inherit;
        }
        
        ${isDarkMode && `
          .intro-video {
            box-shadow: 0 0 25px rgba(236, 72, 153, 0.15);
          }
        `}
      `}
      </style>
    </div>
  );
}
