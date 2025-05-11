import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AudioControllerProps {
  introMusicUrl?: string;
  mainMusicUrl?: string;
  autoPlay?: boolean;
  isIntro?: boolean;
  isDarkMode?: boolean;
}

export default function AudioController({ 
  introMusicUrl = '/HB MUSIC 2.mp3',
  mainMusicUrl = '/Bg music.mp3',
  autoPlay = true,
  isIntro = true,
  isDarkMode = false
}: AudioControllerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Initialize audio on component mount
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audio.src = isIntro ? introMusicUrl : mainMusicUrl;
      audio.volume = 0.5;
      audioRef.current = audio;

      if (autoPlay) {
        playAudio();
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [introMusicUrl, mainMusicUrl, autoPlay, isIntro]);

  // Update audio source when isIntro changes
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.src = isIntro ? introMusicUrl : mainMusicUrl;

      if (wasPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Audio play failed during source update:", error);
        });
      }
    }
  }, [isIntro, introMusicUrl, mainMusicUrl]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          // Wait a short time before showing toast, in case playback still starts
          setTimeout(() => {
            if (audioRef.current?.paused) {
              console.error("Audio play failed:", error);
              toast({
                title: "Audio couldn't play",
                description: "Browser may require user interaction before playing audio",
                variant: "destructive"
              });
              setIsPlaying(false);
            }
          }, 500); // Adjust this delay if needed
        });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      pauseAudio();
      toast({
        title: "Music paused",
        description: "Background music has been paused"
      });
    } else {
      playAudio();
      toast({
        title: "Music playing",
        description: `Now playing ${isIntro ? 'intro' : 'celebration'} music`
      });
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="outline"
        size="sm"
        className={`rounded-full ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' 
            : 'bg-white/80 hover:bg-white text-gray-800'
        } shadow-lg`}
        onClick={toggleAudio}
      >
        {isPlaying ? (
          <>
            <VolumeX className="h-4 w-4 mr-2" />
            <span>Mute</span>
          </>
        ) : (
          <>
            <Volume2 className="h-4 w-4 mr-2" />
            <span>Play Music</span>
          </>
        )}
      </Button>
    </motion.div>
  );
}
