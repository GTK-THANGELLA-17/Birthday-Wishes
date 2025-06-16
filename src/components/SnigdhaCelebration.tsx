import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fireConfettiCannon } from '@/lib/confetti';
import AudioController from './AudioController';
import { BirthdayHeader } from './snigdha-celebration/BirthdayHeader';
import { WishCardSection } from './snigdha-celebration/WishCardSection';
import { AgeStatsSection } from './snigdha-celebration/AgeStatsSection';
import { BirthdayFooter } from './snigdha-celebration/BirthdayFooter';
import { BirthdayLoadingScreen } from './snigdha-celebration/BirthdayLoadingScreen';
import ShareAgeStats from './ShareAgeStats';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Type for Memory items
export interface MemoryItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  poster?: string;
}

// Improved MemoriesSection
function MemoriesSection({ memories, isDarkMode }: { memories: MemoryItem[]; isDarkMode: boolean }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2000, // 2 seconds
    pauseOnHover: true,
    arrows: true,
    nextArrow: <CustomNextArrow isDarkMode={isDarkMode} />,
    prevArrow: <CustomPrevArrow isDarkMode={isDarkMode} />,
  };

  return (
    <div className="max-w-3xl mx-auto relative">
      <Slider {...settings}>
        {memories.map((memory, index) => (
          <div key={index} className="px-2">
            {memory.type === 'image' ? (
              <img
                src={memory.src}
                alt={memory.alt || "Memory image"}
                className="w-full rounded-lg shadow-md object-contain max-h-[400px]"
                loading="lazy"
              />
            ) : (
              <video
                src={memory.src}
                poster={memory.poster}
                controls={false}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full rounded-lg shadow-md max-h-[400px] object-contain"
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

function CustomNextArrow({ onClick, isDarkMode }: any) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 right-4 transform -translate-y-1/2 z-10 p-2 rounded-full transition
        ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-200'}
        shadow-md`}
    >
      <ChevronRight className="h-6 w-6" />
    </button>
  );
}

function CustomPrevArrow({ onClick, isDarkMode }: any) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 left-4 transform -translate-y-1/2 z-10 p-2 rounded-full transition
        ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-200'}
        shadow-md`}
    >
      <ChevronLeft className="h-6 w-6" />
    </button>
  );
}

// === Main SnigdhaCelebration ===

interface SnigdhaCelebrationProps {
  name: string;
  dob: Date;
  isDarkMode: boolean;
  photoUrl?: string;
  onReturnHome: () => void;
  toggleDarkMode?: () => void;
  autoPlayVoice?: boolean;
}

export default function SnigdhaCelebration({
  name,
  dob,
  isDarkMode,
  photoUrl,
  onReturnHome,
  toggleDarkMode,
  autoPlayVoice = false,
}: SnigdhaCelebrationProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const autoPlayedRef = useRef(false);
  const voiceMessageRef = useRef<HTMLButtonElement | null>(null);
  const ageStatsRef = useRef<HTMLDivElement>(null);

  const age = 18;

  const wishes = [
    "🎂 May your day be as bright and beautiful as you are! 🌞🌸\nOn this special birthday, I hope all your dreams take flight. 🕊️✨",
    "🎉 Wishing you a day filled with happiness and a year filled with joy. \nMay your path always be illuminated with love and success. 🌈🌟",
    "Sending you the warmest wishes on your special day.\nIn this magical May, you deserve all the happiness the world has to offer! 🌷🌼🥰",
    "🌠 May all your dreams and wishes come true in this coming year.\nYour presence truly makes the world a better place! 🌍💫",
    "🎈 Happy Birthday!\nMay your day be filled with joy, laughter, and unforgettable moments that become cherished memories! 🎁📸",
  ];

  const memories: MemoryItem[] = [
    { type: "image", src: "/S 2.png", alt: "Celebrating under the stars" },
    { type: "image", src: "/Image 3.png", alt: "Celebrating under the stars" },
    { type: "image", src: "/Image 2.png", alt: "Celebrating under the stars" },
    { type: "image", src: "/S 4.png", alt: "Celebrating under the stars" },
    { type: "image", src: "/Image 6.png", alt: "Celebrating under the stars" },
    { type: "image", src: "/Image 7.png", alt: "Celebrating under the stars" },
    { type: "image", src: "/Image 9.png", alt: "Celebrating under the stars" },
    { type: "image", src: "/S 3.png", alt: "Celebrating under the stars" },
    { type: "image", src: "/Birthday 2.jpg", alt: "Celebrating under the stars" },
    { type: "video", src: "/CD 1.mp4", poster: "/Birthday 1.jpg" },
    { type: "video", src: "/H B 5.mp4", poster: "/S 2.png" },
    { type: "video", src: "/HB 17.mp4", poster: "/Birthday 3.jpg" },
    { type: "video", src: "/HB 15.mp4", poster: "/Birthday 1.jpg" },
    { type: "image", src: "/Birthday 3.jpg", alt: "Celebrating under the stars" },
    { type: "video", src: "/HB 9.mp4", poster: "/Birthday 3.jpg" },
  ];

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && voiceMessageRef.current) {
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach(audio => {
          if (!audio.paused) {
            audio.pause();
          }
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      fireConfettiCannon('center');
      setTimeout(() => fireConfettiCannon('left'), 300);
      setTimeout(() => fireConfettiCannon('right'), 600);
      setTimeout(() => fireConfettiCannon('center'), 1000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (autoPlayVoice && !autoPlayedRef.current) {
      const timer = setTimeout(() => {
        if (voiceMessageRef.current) {
          autoPlayedRef.current = true;
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [autoPlayVoice, isLoading]);

  const handleReturnHome = () => {
    toast({
      title: "Returning Home",
      description: "Taking you back to the beginning",
    });
    onReturnHome();
  };

  if (isLoading) {
    return <BirthdayLoadingScreen isDarkMode={isDarkMode} name={name} />;
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen w-full p-4 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Navigation */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          onClick={handleReturnHome}
          variant="outline"
          size="sm"
          className={`flex items-center gap-1 ${
            isDarkMode
              ? 'bg-gray-900 border-gray-700 text-white hover:bg-gray-800'
              : 'bg-white text-gray-900 border border-gray-300'
          } btn-edge-effect shadow-md hover:shadow-lg transition-all`}
        >
          <span>Return Home</span>
        </Button>
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        {toggleDarkMode && (
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className={`rounded-full transition-all duration-300 ${
              isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'
            } shadow-md`}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        )}
        <AudioController isIntro={false} isDarkMode={isDarkMode} autoPlay={true} />
      </div>

      <div className="max-w-5xl w-full mx-auto space-y-8">
        <BirthdayHeader name={name} age={age} isDarkMode={isDarkMode} />
        <motion.p
          className={`text-xl max-w-2xl mx-auto font-birthday ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {format(dob, "MMMM dd, yyyy")}
        </motion.p>

        <MemoriesSection memories={memories} isDarkMode={isDarkMode} />

        <WishCardSection
          name={name}
          wishes={wishes}
          isDarkMode={isDarkMode}
          photoUrl={photoUrl}
          voiceMessageRef={voiceMessageRef}
        />

        <motion.div
          ref={ageStatsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <AgeStatsSection dob={dob} isDarkMode={isDarkMode} ageStatsRef={ageStatsRef} />
        </motion.div>

        <BirthdayFooter isDarkMode={isDarkMode} />
      </div>
    </motion.div>
  );
}
