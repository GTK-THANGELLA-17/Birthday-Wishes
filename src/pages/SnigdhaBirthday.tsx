
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SnigdhaCelebration from '@/components/SnigdhaCelebration';
import SnigdhaIntroPage from '@/components/SnigdhaIntroPage';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '@/components/LoadingAnimation';

interface SnigdhaBirthdayProps {
  startPage?: 'intro' | 'celebration';
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function SnigdhaBirthday({ 
  startPage = 'intro', 
  isDarkMode, 
  toggleDarkMode 
}: SnigdhaBirthdayProps) {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(startPage === 'intro');
  const [isLoading, setIsLoading] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  
  // Date of birth fixed to May 12, 2007
  const [dob] = useState(new Date(2007, 4, 12)); // May is 4 (0-indexed months)
  
  // Enhanced transition animations
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };
  
  const pageTransition = {
    duration: 0.6,
    ease: [0.43, 0.13, 0.23, 0.96]
  };

  // Initialize audio context on first interaction or component mount
  useEffect(() => {
    // Try to initialize audio context immediately for better mobile support
    const initializeAudio = () => {
      if (!audioInitialized) {
        // Create a silent audio context to enable audio playback later
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          try {
            const audioCtx = new AudioContext();
            // Create a silent oscillator
            const oscillator = audioCtx.createOscillator();
            oscillator.connect(audioCtx.destination);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.001);
            setAudioInitialized(true);
            console.log("Audio context initialized successfully");
          } catch (err) {
            console.error("Failed to initialize audio context:", err);
          }
        }
      }
    };
    
    // Try to initialize immediately
    initializeAudio();

    // Also listen for user interaction
    const handleInteraction = () => {
      initializeAudio();
    };

    // Listen for user interaction
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [audioInitialized]);
  
  const handleStartCelebration = () => {
    setIsLoading(true);
    // Simulate loading transition with enhanced duration
    setTimeout(() => {
      setShowIntro(false);
      setIsLoading(false);
    }, 2000); // Slightly longer to show off the new loading animation
  };
  
  const handleReturnHome = () => {
    // Use navigate to return to root, not reload
    navigate('/');
    setShowIntro(true);
  };
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className={`min-h-screen w-full ${isDarkMode ? 'bg-gray-950' : 'bg-white'}`}
    >
      {isLoading ? (
        <LoadingAnimation isDarkMode={isDarkMode} isIntro={true} />
      ) : showIntro ? (
        <SnigdhaIntroPage 
          onEnter={handleStartCelebration} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
        />
      ) : (
        <SnigdhaCelebration 
          name="Snigdha"
          dob={dob}
          isDarkMode={isDarkMode}
          onReturnHome={handleReturnHome}
          toggleDarkMode={toggleDarkMode}
          autoPlayVoice={false} // Set to false to ensure voice doesn't auto-play
        />
      )}
    </motion.div>
  );
}
