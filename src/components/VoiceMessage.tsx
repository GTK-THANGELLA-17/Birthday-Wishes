
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, User, UserCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VoiceMessageProps {
  message: string;
  isDarkMode: boolean;
  voiceGender: 'male' | 'female';
  onVoiceGenderChange: (gender: 'male' | 'female') => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

export default function VoiceMessage({ 
  message, 
  isDarkMode, 
  voiceGender, 
  onVoiceGenderChange,
  buttonRef 
}: VoiceMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const maleAudioRef = useRef<HTMLAudioElement | null>(null);
  const femaleAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize speech synthesis
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

  // Reference to keep track of the current utterance
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Create audio elements for prerecorded messages if needed
    if (!maleAudioRef.current && typeof Audio !== 'undefined') {
      maleAudioRef.current = new Audio();
    }
    if (!femaleAudioRef.current && typeof Audio !== 'undefined') {
      femaleAudioRef.current = new Audio();
    }
    
    // Cleanup function
    return () => {
      if (synth && utteranceRef.current) {
        synth.cancel();
      }
      if (maleAudioRef.current) {
        maleAudioRef.current.pause();
        maleAudioRef.current.currentTime = 0;
      }
      if (femaleAudioRef.current) {
        femaleAudioRef.current.pause();
        femaleAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  const startSpeaking = () => {
    if (!synth) return;
    
    setHasInteracted(true);

    // Cancel any ongoing speech
    synth.cancel();

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(message);
    utteranceRef.current = utterance;

    // Set voice properties based on gender
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = voiceGender === 'female' ? 1.2 : 0.9;
    utterance.volume = 1;

    // Try to find an appropriate voice
    let voices = synth.getVoices();
    
    // Sometimes getVoices() returns empty on first call, we need to wait
    if (voices.length === 0) {
      // Try again after a slight delay
      setTimeout(() => {
        voices = synth.getVoices();
        setVoice(voices);
        synth.speak(utterance);
      }, 100);
    } else {
      setVoice(voices);
      synth.speak(utterance);
    }

    setIsPlaying(true);

    // Event handlers
    utterance.onend = () => {
      setIsPlaying(false);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      console.error("SpeechSynthesis error");
    };

    // Helper function to set the voice based on gender
    function setVoice(availableVoices: SpeechSynthesisVoice[]) {
      if (availableVoices.length > 0) {
        // Try to find a gender specific voice
        const filteredVoices = availableVoices.filter(voice => {
          const voiceName = voice.name.toLowerCase();
          if (voiceGender === 'female') {
            return voiceName.includes('female') || voiceName.includes('woman') || 
                  voiceName.includes('girl') || voiceName.includes('zira');
          } else {
            return voiceName.includes('male') || voiceName.includes('man') || 
                  voiceName.includes('boy') || voiceName.includes('david');
          }
        });

        // If we found voices matching our criteria, use the first one
        if (filteredVoices.length > 0) {
          utterance.voice = filteredVoices[0];
        } 
        // Otherwise, try to pick based on default voices
        else {
          // Pick a voice that typically sounds like the requested gender
          if (voiceGender === 'female') {
            // Common female-sounding voices
            const femaleDefaults = availableVoices.filter(v => 
              ['google us english female', 'samantha', 'victoria', 'zira', 'karen', 'moira', 'tessa'].some(
                name => v.name.toLowerCase().includes(name)
              )
            );
            if (femaleDefaults.length > 0) {
              utterance.voice = femaleDefaults[0];
            }
          } else {
            // Common male-sounding voices
            const maleDefaults = availableVoices.filter(v => 
              ['google us english male', 'daniel', 'alex', 'david', 'mark', 'fred'].some(
                name => v.name.toLowerCase().includes(name)
              )
            );
            if (maleDefaults.length > 0) {
              utterance.voice = maleDefaults[0];
            }
          }
        }
      }
    }
  };

  const stopSpeaking = () => {
    if (synth) {
      synth.cancel();
    }
    setIsPlaying(false);
  };

  const handleVoiceChange = (value: string) => {
    if (isPlaying) {
      stopSpeaking();
    }
    onVoiceGenderChange(value as 'male' | 'female');
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={voiceGender}
        onValueChange={handleVoiceChange}
      >
        <SelectTrigger className={`w-[110px] h-9 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 text-gray-200' 
            : 'bg-white border-gray-200 text-gray-700'
        }`}>
          <SelectValue placeholder="Voice" />
        </SelectTrigger>
        <SelectContent className={isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : ''}>
          <SelectItem value="male">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Male Voice
            </div>
          </SelectItem>
          <SelectItem value="female">
            <div className="flex items-center">
              <UserCircle className="w-4 h-4 mr-2" />
              Female Voice
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        animate={hasInteracted ? {} : { 
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 0 0 rgba(96,165,250,0)',
            '0 0 8px rgba(96,165,250,0.5)',
            '0 0 0 rgba(96,165,250,0)'
          ]
        }}
        transition={{ 
          duration: 2,
          repeat: hasInteracted ? 0 : Infinity,
          repeatDelay: 1
        }}
      >
        {isPlaying ? (
          <Button 
            onClick={stopSpeaking}
            variant={isDarkMode ? "outline" : "secondary"}
            size="sm"
            className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
          >
            <VolumeX className="h-4 w-4 mr-2" />
            <span>Stop</span>
          </Button>
        ) : (
          <Button 
            ref={buttonRef}
            onClick={startSpeaking}
            variant={isDarkMode ? "outline" : "secondary"}
            size="sm"
            className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : ''} ${
              hasInteracted ? '' : 'ring-2 ring-blue-400 ring-opacity-50'
            }`}
          >
            <Volume2 className="h-4 w-4 mr-2" />
            <span>Listen</span>
          </Button>
        )}
      </motion.div>
    </div>
  );
}
