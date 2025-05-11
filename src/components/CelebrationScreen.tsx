import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, 
  Volume2, 
  VolumeX, 
  Copy, 
  Facebook, 
  Instagram, 
  Twitter, 
  Share2,
  Gift,
  Cake,
  Calendar,
  Clock,
  Sparkles,
  Heart,
  Star,
  PartyPopper,
  Download,
  User,
  UserCircle,
  Info,
  Moon,
  Sun,
  Upload,
  ImagePlus,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ImageCarousel from './ImageCarousel';
import { burstConfetti, createConfetti, fireConfettiCannon } from '@/lib/confetti';
import { ColorTheme, Gender } from '@/pages/Index';
import html2canvas from 'html2canvas';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MarqueeCards from './MarqueeCards';
import DeveloperInfoCard from './DeveloperInfoCard';
import { Link } from 'react-router-dom';
import { type MediaItem } from './EnhancedCarousel';

interface CelebrationScreenProps {
  name: string;
  dob: Date;
  colorTheme: ColorTheme;
  gender?: Gender;
  photoUrl?: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onReturnHome: () => void;
}

export default function CelebrationScreen({ 
  name, 
  dob, 
  colorTheme, 
  gender, 
  photoUrl, 
  isDarkMode, 
  toggleDarkMode,
  onReturnHome 
}: CelebrationScreenProps) {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isAgeVisible, setIsAgeVisible] = useState(false);
  const [showCopyConfirmation, setShowCopyConfirmation] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<'male' | 'female'>(gender === 'female' ? 'female' : 'male');
  const [showDeveloperInfo, setShowDeveloperInfo] = useState(false);
  const musicRef = useRef<HTMLAudioElement>(null);
  const maleVoiceRef = useRef<HTMLAudioElement>(null);
  const femaleVoiceRef = useRef<HTMLAudioElement>(null);
  const messageCardRef = useRef<HTMLDivElement>(null);
  const ageCardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Include both image and video media for carousel with proper typing
const defaultMediaItems: MediaItem[] = gender === 'female' ? [
  { type: 'image', src: '/Birthday 2.jpg' },
  { type: 'video', src: '/HB 5.mp4' },
  { type: 'video', src: '/CD 1.mp4' },
  { type: 'video', src: '/HB 9.mp4' },
  { type: 'video', src: '/HB 17.mp4' },
  { type: 'video', src: '/HB 15.mp4' },
] : [
  { type: 'image', src: '/Birthday 2.jpg' },
  { type: 'video', src: '/HB 5.mp4' },
  { type: 'video', src: '/CD 1.mp4' },
  { type: 'video', src: '/HB 9.mp4' },
  { type: 'video', src: '/HB 17.mp4' },
  { type: 'video', src: '/HB 15.mp4' },
];

  const mediaItems: MediaItem[] = photoUrl 
    ? [{ type: 'image', src: photoUrl, alt: `Photo of ${name}` }, ...defaultMediaItems]
    : defaultMediaItems;

  const getThemeStyles = () => {
    if (isDarkMode) {
      switch (colorTheme) {
        case 'pink':
          return {
            primaryColor: 'text-pink-400',
            bgGradient: 'from-pink-500/60 to-purple-600/60',
            iconBg: 'bg-pink-950',
            iconColor: 'text-pink-400',
            buttonHover: 'hover:bg-pink-600',
            cardBorder: 'border-pink-800',
            cardBg: 'bg-gradient-to-br from-gray-900 to-gray-800'
          };
        case 'purple':
          return {
            primaryColor: 'text-purple-400',
            bgGradient: 'from-purple-500/60 to-indigo-600/60',
            iconBg: 'bg-purple-950',
            iconColor: 'text-purple-400',
            buttonHover: 'hover:bg-purple-600',
            cardBorder: 'border-purple-800',
            cardBg: 'bg-gradient-to-br from-gray-900 to-gray-800'
          };
        case 'green':
          return {
            primaryColor: 'text-green-400',
            bgGradient: 'from-green-500/60 to-teal-600/60',
            iconBg: 'bg-green-950',
            iconColor: 'text-green-400',
            buttonHover: 'hover:bg-green-600',
            cardBorder: 'border-green-800',
            cardBg: 'bg-gradient-to-br from-gray-900 to-gray-800'
          };
        case 'orange':
          return {
            primaryColor: 'text-orange-400',
            bgGradient: 'from-orange-500/60 to-amber-600/60',
            iconBg: 'bg-orange-950',
            iconColor: 'text-orange-400',
            buttonHover: 'hover:bg-orange-600',
            cardBorder: 'border-orange-800',
            cardBg: 'bg-gradient-to-br from-gray-900 to-gray-800'
          };
        case 'blue':
        default:
          return {
            primaryColor: 'text-blue-400',
            bgGradient: 'from-blue-500/60 to-purple-600/60',
            iconBg: 'bg-blue-950',
            iconColor: 'text-blue-400',
            buttonHover: 'hover:bg-blue-600',
            cardBorder: 'border-blue-800',
            cardBg: 'bg-gradient-to-br from-gray-900 to-gray-800'
          };
      }
    } else {
      switch (colorTheme) {
        case 'pink':
          return {
            primaryColor: 'text-pink-500',
            bgGradient: 'from-pink-500 to-purple-600',
            iconBg: 'bg-pink-100',
            iconColor: 'text-pink-500',
            buttonHover: 'hover:bg-pink-600',
            cardBorder: 'border-pink-200',
            cardBg: 'bg-gradient-to-br from-white to-pink-50'
          };
        case 'purple':
          return {
            primaryColor: 'text-purple-500',
            bgGradient: 'from-purple-500 to-indigo-600',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-500',
            buttonHover: 'hover:bg-purple-600',
            cardBorder: 'border-purple-200',
            cardBg: 'bg-gradient-to-br from-white to-purple-50'
          };
        case 'green':
          return {
            primaryColor: 'text-green-500',
            bgGradient: 'from-green-500 to-teal-600',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-500',
            buttonHover: 'hover:bg-green-600',
            cardBorder: 'border-green-200',
            cardBg: 'bg-gradient-to-br from-white to-green-50'
          };
        case 'orange':
          return {
            primaryColor: 'text-orange-500',
            bgGradient: 'from-orange-500 to-amber-600',
            iconBg: 'bg-orange-100',
            iconColor: 'text-orange-500',
            buttonHover: 'hover:bg-orange-600',
            cardBorder: 'border-orange-200',
            cardBg: 'bg-gradient-to-br from-white to-orange-50'
          };
        case 'blue':
        default:
          return {
            primaryColor: 'text-blue-500',
            bgGradient: 'from-blue-500 to-purple-600',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-500',
            buttonHover: 'hover:bg-blue-600',
            cardBorder: 'border-blue-200',
            cardBg: 'bg-gradient-to-br from-white to-blue-50'
          };
      }
    }
  };

  const themeStyles = getThemeStyles();

  const generateCelebrationMessage = () => {
    const birthdayMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dob);
    const pronouns = gender === 'female' ? 
      { subjective: 'she', objective: 'her', possessive: 'her', reflexive: 'herself' } : 
      gender === 'male' ? 
      { subjective: 'he', objective: 'him', possessive: 'his', reflexive: 'himself' } :
      { subjective: 'you', objective: 'you', possessive: 'your', reflexive: 'yourself' };
    
    const universalWishes = [
      "Wishing you an amazing birthday and a year full of success!",
      "May your special day be filled with happiness and your year with joy!",
      "Happy Birthday! May this year bring you everything you wish for and more!",
      "Celebrating you today! Wishing you a fantastic year ahead with endless possibilities!",
      "Here's to another year of wonderful memories and exciting adventures!"
    ];
    
    const randomWish = universalWishes[Math.floor(Math.random() * universalWishes.length)];
    
    return `
🎂 Happy Birthday, ${name}! 🥳

${randomWish}

From all of us at My Wishes To You, we're celebrating this special day with you! Today marks another wonderful year in ${pronouns.possessive} life's journey - a time to reflect on achievements, cherish memories, and look forward to new adventures.

Born in the month of ${birthdayMonth}, ${pronouns.subjective} have a unique spark that makes ${pronouns.objective} truly special. Every birthday is a milestone that celebrates growth, wisdom gained, and dreams pursued.

We believe that ${pronouns.possessive} kindness, determination, and incredible spirit touch the lives of everyone around ${pronouns.objective}. The world is a brighter place because ${pronouns.subjective} are in it.

As ${pronouns.subjective} celebrate this special day, remember that each moment is a gift and each day brings new opportunities to follow ${pronouns.possessive} dreams.

May this year bring:
• Abundant happiness and laughter
• Success in all endeavors
• Fulfillment of ${pronouns.possessive} deepest wishes
• Good health and prosperity
• Wonderful new memories with loved ones

Here's to ${pronouns.objective} and another magnificent year ahead!

"The future belongs to those who believe in the beauty of their dreams." – Eleanor Roosevelt
"Life isn't about finding yourself. Life is about creating yourself." – George Bernard Shaw
  `;
  };

  const celebrationMessage = generateCelebrationMessage();

  const calculateAge = () => {
    const today = new Date();

    const ageMilliseconds = today.getTime() - dob.getTime();
    const ageInSeconds = Math.floor(ageMilliseconds / 1000);
    const ageInMinutes = Math.floor(ageInSeconds / 60);
    const ageInHours = Math.floor(ageInMinutes / 60);
    const ageInDays = Math.floor(ageInHours / 24);
    const ageInYears = today.getFullYear() - dob.getFullYear();

    let ageInMonths = today.getMonth() - dob.getMonth() + (12 * ageInYears);
    if (today.getDate() < dob.getDate()) ageInMonths--;

    const ageInWeeks = Math.floor(ageInDays / 7);
    
    let lifeStageMessage = "";
    if (ageInYears < 13) {
      lifeStageMessage = "These wonderful years of childhood are filled with discovery and joy. Every day brings new learning and adventures!";
    } else if (ageInYears < 20) {
      lifeStageMessage = "These Upcoming  years are a transformative time of finding your unique path. Embrace this journey of becoming who you're meant to be!";
    } else if (ageInYears < 30) {
      lifeStageMessage = "Your twenties are perfect for exploration and building your foundation. Set bold goals and take inspired action toward your dreams!";
    } else if (ageInYears < 40) {
      lifeStageMessage = "In your thirties, you're likely finding your true stride in life. This is a time of growth, purpose, and meaningful connections.";
    } else if (ageInYears < 50) {
      lifeStageMessage = "The forties bring wisdom and confidence like never before. It's an excellent time to reassess goals and embrace exciting new challenges.";
    } else if (ageInYears < 60) {
      lifeStageMessage = "Your fifties can be some of life's most fulfilling years. You have experience, wisdom, and the freedom to pursue your deepest passions.";
    } else {
      lifeStageMessage = "These golden years are perfect for savoring life's precious moments, sharing your wisdom, and enjoying the beautiful legacy you've created.";
    }

    const universalMessage = "This milestone is truly worth celebrating! Each phase of life brings its own special gifts and opportunities.";

    return `
Age Milestone Celebration for ${name}:

You've successfully completed:
• ${ageInYears} incredible years
• ${ageInMonths} months of experiences
• ${ageInWeeks} weeks of memories
• ${ageInDays} days of moments that matter
• ${ageInHours.toLocaleString()} hours of living fully
• ${ageInMinutes.toLocaleString()} minutes of making a difference
• ${ageInSeconds.toLocaleString()} seconds of unique contributions

${lifeStageMessage}

${universalMessage}

Looking forward:
The best is still ahead! Continue seeking new experiences and opportunities that bring joy and fulfillment. Embracing change and continuous growth leads to an ever more rewarding life journey.

"Every year of life is a gift to be celebrated and treasured."
"Today is the oldest you've ever been and the youngest you'll ever be again. Make the most of it!"
    `;
  };

  useEffect(() => {
    // Initialize audio elements immediately to allow user interaction
    if (musicRef.current) {
      musicRef.current.load();
    }
    if (maleVoiceRef.current) {
      maleVoiceRef.current.load();
    }
    if (femaleVoiceRef.current) {
      femaleVoiceRef.current.load();
    }

    createConfetti({
      particleCount: 200,
      spread: 90,
      origin: { x: 0.5, y: 0.5 }
    });

    // Show components with animation delay
    setTimeout(() => setIsMessageVisible(true), 1000);
    setTimeout(() => setIsAgeVisible(true), 3000);
    
    const confettiInterval = setInterval(() => {
      fireConfettiCannon(Math.random() > 0.5 ? 'left' : 'right');
    }, 8000);

    return () => clearInterval(confettiInterval);
  }, []);

  const playMusic = () => {
    if (musicRef.current) {
      // Set audio context to running state first by user interaction
      const playPromise = musicRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setMusicPlaying(true);
        }).catch(error => {
          console.error("Error playing music:", error);
          toast({
            title: "Unable to play music",
            description: "Your browser blocked autoplay. Please try again.",
            variant: "destructive",
          });
        });
      }
    }
  };

  const stopMusic = () => {
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
      setMusicPlaying(false);
    }
  };

  const playVoice = () => {
    const voiceRef = selectedVoice === 'male' ? maleVoiceRef : femaleVoiceRef;
    
    if (voiceRef.current) {
      if (musicRef.current && musicPlaying) {
        musicRef.current.volume = 0.2;
      }
      
      // Create a backup text-to-speech solution if the audio file fails
      const playPromise = voiceRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setVoicePlaying(true);
          
          voiceRef.current!.onended = () => {
            setVoicePlaying(false);
            if (musicRef.current && musicPlaying) {
              musicRef.current.volume = 1;
            }
          };
        }).catch(error => {
          console.error("Error playing voice:", error);
          
          // Fallback to browser's built-in speech synthesis
          const speechSynthesis = window.speechSynthesis;
          if (speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance(celebrationMessage.substring(0, 400)); // Read more text
            
            // Try to find a voice that matches the selected gender
            const voices = speechSynthesis.getVoices();
            if (voices.length > 0) {
              const genderVoices = voices.filter(voice => 
                selectedVoice === 'female' ? voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman') : 
                voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('man')
              );
              
              if (genderVoices.length > 0) {
                utterance.voice = genderVoices[0];
              } else if (voices.length > 1) {
                // If no gender-specific voice found, use any available voice
                utterance.voice = voices[selectedVoice === 'female' ? 1 : 0];
              }
            }
            
            utterance.rate = 0.9; // Slightly slower for better comprehension
            utterance.pitch = selectedVoice === 'female' ? 1.2 : 0.9;
            
            setVoicePlaying(true);
            
            utterance.onend = () => {
              setVoicePlaying(false);
              if (musicRef.current && musicPlaying) {
                musicRef.current.volume = 1;
              }
            };
            
            speechSynthesis.speak(utterance);
            
            toast({
              title: "Using browser speech synthesis",
              description: "Playing birthday wishes with your browser's built-in voice.",
            });
          } else {
            toast({
              title: "Voice playback unavailable",
              description: "Your browser doesn't support speech synthesis.",
              variant: "destructive",
            });
          }
        });
      }
    }
  };

  const stopVoice = () => {
    // Stop audio element if playing
    if (maleVoiceRef.current) {
      maleVoiceRef.current.pause();
      maleVoiceRef.current.currentTime = 0;
    }
    
    if (femaleVoiceRef.current) {
      femaleVoiceRef.current.pause();
      femaleVoiceRef.current.currentTime = 0;
    }
    
    // Also stop speech synthesis if it's being used
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    setVoicePlaying(false);
    
    if (musicRef.current && musicPlaying) {
      musicRef.current.volume = 1;
    }
  };

  const copyMessage = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setShowCopyConfirmation(type);
    setTimeout(() => setShowCopyConfirmation(null), 2000);
    
    toast({
      title: "Copied to clipboard",
      description: `${type} message has been copied.`,
    });
    
    burstConfetti(1, 0);
  };

  const downloadCard = (cardRef: React.RefObject<HTMLDivElement>, cardType: string) => {
    if (cardRef.current) {
      html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: isDarkMode ? '#121212' : '#ffffff',
        scale: 2,
        logging: false,
        onclone: (document) => {
          const headings = document.querySelectorAll('[class*="bg-gradient"]');
          headings.forEach((heading) => {
            if (heading instanceof HTMLElement) {
              heading.style.backgroundImage = 'none';
              heading.style.color = isDarkMode ? '#ffffff' : '#000000';
              heading.style.webkitTextFillColor = 'initial';
            }
          });
        }
      }).then(canvas => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `birthday-${cardType}-for-${name}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Birthday card downloaded",
          description: `Your personalized birthday ${cardType} has been saved to your device.`,
        });
        
        burstConfetti(3, 300);
      });
    }
  };

  const shareOnSocial = (platform: 'facebook' | 'twitter' | 'native', content: string) => {
    let url = '';
    const title = `Birthday wishes for ${name} - My Wishes To You`;
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(content.substring(0, 300))}`;
        window.open(url, '_blank');
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content.substring(0, 240))}&hashtags=birthday,celebration,mywishestoyou`;
        window.open(url, '_blank');
        break;
      case 'native':
        if (navigator.share) {
          navigator.share({
            title: title,
            text: content.substring(0, 500),
          }).catch(err => {
            toast({
              title: "Error sharing",
              description: "Something went wrong with sharing.",
              variant: "destructive",
            });
          });
        } else {
          toast({
            title: "Sharing not supported",
            description: "Your browser doesn't support direct sharing.",
          });
        }
        break;
    }
    
    toast({
      title: "Sharing content",
      description: `Preparing to share on ${platform === 'native' ? 'your apps' : platform}.`,
    });
  };

  const floatingIconVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  const animatedTextVariants = {
    initial: { color: "#000000" },
    hover: {
      color: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6B6B"],
      transition: {
        duration: 2,
        repeat: Infinity,
      }
    }
  };
  
  // Text reveal animation variants
  const textRevealVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  // Card hover effect variants
  const cardVariants = {
    initial: { 
      scale: 1,
      rotateY: 0
    },
    hover: { 
      scale: 1.02,
      rotateY: [-2, 2, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.98 
    }
  };

  // Letter animation for text generate effect
  const LetterAnim = ({ children, delay = 0 }: { children: string, delay?: number }) => {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: delay }}
        className="inline-block"
      >
        {children}
      </motion.span>
    );
  };

  // Create text generate effect
  const TextGenerate = ({ text }: { text: string }) => {
    return (
      <div>
        {text.split('').map((char, index) => (
          <LetterAnim key={index} delay={index * 0.03}>
            {char}
          </LetterAnim>
        ))}
      </div>
    );
  };
  
  // SVG mask for hover effect
  const SvgMask = () => (
    <svg className="absolute pointer-events-none inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <mask id="mask">
          <rect width="100%" height="100%" fill="white" />
        </mask>
      </defs>
    </svg>
  );

  // Meteor effect for background
  const MeteorEffect = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${themeStyles.bgGradient}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: `0 0 10px 2px ${isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}`,
            }}
            animate={{
              top: ['0%', '100%'],
              left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [1, 0],
              width: ['1px', '3px'],
              height: ['1px', '300px'],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`w-full max-w-4xl mx-auto px-4 pt-8 pb-16 relative ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      {/* Lamp effect background */}
      <div 
        className={`absolute inset-0 -z-10 h-full w-full overflow-hidden ${isDarkMode ? 'bg-gray-950' : 'bg-white'}`}
      >
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/10' : 'bg-white/10'} backdrop-blur-sm`}></div>
        
        <motion.div 
          className={`absolute top-1/4 left-1/4 h-56 w-56 rounded-full bg-gradient-to-br ${themeStyles.bgGradient} blur-3xl opacity-30`}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        
        <motion.div 
          className={`absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-gradient-to-tr ${isDarkMode ? 'from-blue-400/20 via-green-400/10 to-yellow-400/20' : 'from-blue-400/30 via-green-400/20 to-yellow-400/30'} blur-3xl`}
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 5,
          }}
        />
      </div>
      
      <MeteorEffect />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center mb-6">
          <motion.h1 
            className={`text-4xl md:text-5xl font-bold text-center bg-gradient-to-r ${themeStyles.bgGradient} text-transparent bg-clip-text`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{
              scale: 1.05,
              color: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6B6B"],
              transition: {
                duration: 2,
                repeat: Infinity,
              }
            }}
          >
            <span>Happy Birthday, {name}!</span>
          </motion.h1>
          
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full transition-all duration-300 dark:bg-gray-800 dark:text-white"
              >
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            
            <Button
              variant="ghost" 
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full transition-all duration-300 dark:text-white"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative perspective"
        >
          {/* Enhanced MarqueeCards to support videos */}
          <div className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
            <span className="flex items-center justify-center gap-1">
              <ImagePlus className="h-4 w-4" />
              Your photo will be displayed as part of your birthday wish
            </span>
          </div>
          <MarqueeCards images={mediaItems} isDarkMode={isDarkMode} />
        </motion.div>

        <AnimatePresence>
          {isMessageVisible && (
            <motion.div
              ref={messageCardRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`rounded-2xl p-6 shadow-lg border ${themeStyles.cardBorder} relative overflow-hidden card-hover-effect`}
              whileHover={{
                scale: 1.02,
                rotateY: [-2, 2, 0],
                transition: { duration: 0.5, ease: "easeInOut" }
              }}
              style={{
                background: isDarkMode ? 
                  'rgba(30, 30, 30, 0.7)' : 
                  'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              {/* SVG Mask for hover effect */}
              <svg className="absolute pointer-events-none inset-0 h-full w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="border-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={isDarkMode ? "#f472b699" : "#f472b6"} />
                    <stop offset="50%" stopColor={isDarkMode ? "#a78bfa99" : "#a78bfa"} />
                    <stop offset="100%" stopColor={isDarkMode ? "#60a5fa99" : "#60a5fa"} />
                  </linearGradient>
                  <mask id="card-mask">
                    <rect width="100%" height="100%" fill="white" />
                  </mask>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth="2"
                  stroke="url(#border-gradient-2)"
                  fill="none"
                  mask="url(#card-mask)"
                  rx="12"
                  className="transition-all duration-300 opacity-0 group-hover:opacity-100"
                />
              </svg>
              
              <motion.div
                className="absolute -right-4 -top-4 opacity-20"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1] 
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse" as const
                }}
              >
                <PartyPopper className="h-32 w-32" />
              </motion.div>
              
              <div className="flex flex-col sm:flex-row sm:gap-4 mb-4">
                {photoUrl && (
                  <motion.div 
                    className={`flex-shrink-0 mb-3 sm:mb-0 ${gender === 'female' ? 'bg-pink-100' : gender === 'male' ? 'bg-blue-100' : 'bg-gray-100'} p-1 rounded-lg overflow-hidden shadow-sm ${isDarkMode ? 'bg-opacity-30' : ''}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src={photoUrl} 
                      alt={name} 
                      className={`w-16 h-16 object-cover rounded-md ${gender === 'female' ? 'border-pink-200' : gender === 'male' ? 'border-blue-200' : 'border-gray-200'} border-2`}
                    />
                  </motion.div>
                )}
                <div>
                  <motion.h2 
                    className={`text-2xl font-bold bg-gradient-to-r ${themeStyles.bgGradient} text-transparent bg-clip-text flex items-center gap-2`}
                    whileHover={{
                      color: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6B6B"],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                      }
                    }}
                  >
                    <Cake className="h-5 w-5" />
                    Birthday Wishes
                  </motion.h2>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Personalized for {name}</p>
                </div>
              </div>
              
              <div className="space-y-3 whitespace-pre-line text-sm md:text-base leading-relaxed card-content">
                {celebrationMessage.split('\n').map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{
                      opacity: 0,
                      clipPath: "inset(0 100% 0 0)"
                    }}
                    animate={{
                      opacity: 1,
                      clipPath: "inset(0 0% 0 0)"
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 * i,
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                    className={i === 0 ? "font-bold text-lg" : ""}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`button-hover-effect relative overflow-hidden group ${showCopyConfirmation === 'Celebration' ? 'bg-green-100 dark:bg-green-900' : ''}`}
                  onClick={() => copyMessage(celebrationMessage, "Celebration")}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <Copy className="h-4 w-4 mr-2" />
                  {showCopyConfirmation === 'Celebration' ? 'Copied!' : 'Copy Message'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="button-hover-effect relative overflow-hidden group"
                  onClick={() => downloadCard(messageCardRef, 'wishes')}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <Download className="h-4 w-4 mr-2" />
                  Save as Image
                </Button>

                <div className="flex items-center gap-2 ml-auto">
                  <Select
                    value={selectedVoice}
                    onValueChange={(value) => setSelectedVoice(value as 'male' | 'female')}
                  >
                    <SelectTrigger className="w-[110px] h-9 dark:bg-gray-800 dark:border-gray-700">
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
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
                  
                  {voicePlaying ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="button-hover-effect relative overflow-hidden group dark:bg-gray-800" 
                      onClick={stopVoice}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <VolumeX className="h-4 w-4 mr-2" />
                      Stop
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="button-hover-effect relative overflow-hidden group dark:bg-gray-800" 
                      onClick={playVoice}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <Volume2 className="h-4 w-4 mr-2" />
                      Listen
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 border-t pt-4">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                  <Share2 className="h-4 w-4 mr-1" />
                  Share Wishes:
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="button-hover-effect text-blue-600 dark:text-blue-400 relative overflow-hidden group"
                  onClick={() => shareOnSocial('facebook', celebrationMessage)}
                >
                  <motion.div 
                    className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <Facebook className="h-4 w-4 mr-1" />
                  Facebook
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="button-hover-effect text-blue-400 relative overflow-hidden group"
                  onClick={() => shareOnSocial('twitter', celebrationMessage)}
                >
                  <motion.div 
                    className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <Twitter className="h-4 w-4 mr-1" />
                  Twitter
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="button-hover-effect text-gray-600 dark:text-gray-400 relative overflow-hidden group"
                  onClick={() => shareOnSocial('native', celebrationMessage)}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAgeVisible && (
            <motion.div
              ref={ageCardRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`rounded-2xl p-6 shadow-lg border ${themeStyles.cardBorder} relative card-hover-effect`}
              whileHover={{
                scale: 1.02,
                rotateY: [-2, 2, 0],
                transition: { duration: 0.5, ease: "easeInOut" }
              }}
              style={{
                background: isDarkMode ? 
                  'rgba(30, 30, 30, 0.7)' : 
                  'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              {/* SVG Mask for hover effect */}
              <svg className="absolute pointer-events-none inset-0 h-full w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="border-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={isDarkMode ? "#f59e0b99" : "#f59e0b"} />
                    <stop offset="50%" stopColor={isDarkMode ? "#ec489999" : "#ec4899"} />
                    <stop offset="100%" stopColor={isDarkMode ? "#8b5cf699" : "#8b5cf6"} />
                  </linearGradient>
                  <mask id="card-mask-2">
                    <rect width="100%" height="100%" fill="white" />
                  </mask>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth="2"
                  stroke="url(#border-gradient-2)"
                  fill="none"
                  mask="url(#card-mask-2)"
                  rx="12"
                  className="transition-all duration-300 opacity-0 group-hover:opacity-100"
                />
              </svg>
              
              <motion.div
                className={`absolute right-6 top-6 ${isDarkMode ? 'opacity-20' : 'opacity-30'}`}
                animate={{ 
                  rotate: 360,
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Clock className="h-16 w-16" />
              </motion.div>
              
              <motion.h2 
                className="text-2xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-pink-600 text-transparent bg-clip-text flex items-center gap-2"
                whileHover={{
                  color: ["#f59e0b", "#ec4899", "#8b5cf6", "#f59e0b"],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                  }
                }}
              >
                <Calendar className="h-5 w-5" />
                Age Milestone
              </motion.h2>
              
              <div className="whitespace-pre-line text-sm md:text-base leading-relaxed card-content">
                {calculateAge().split('\n').map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{
                      opacity: 0,
                      clipPath: "inset(0 100% 0 0)"
                    }}
                    animate={{
                      opacity: 1,
                      clipPath: "inset(0 0% 0 0)"
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 * i,
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                    className={i === 0 ? "font-bold text-lg" : ""}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`button-hover-effect relative overflow-hidden group ${showCopyConfirmation === 'Age' ? 'bg-green-100 dark:bg-green-900' : ''}`}
                  onClick={() => copyMessage(calculateAge(), "Age")}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <Copy className="h-4 w-4 mr-2" />
                  {showCopyConfirmation === 'Age' ? 'Copied!' : 'Copy Details'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="button-hover-effect relative overflow-hidden group"
                  onClick={() => downloadCard(ageCardRef, 'age-milestone')}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <Download className="h-4 w-4 mr-2" />
                  Save as Image
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 border-t pt-4">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                  <Share2 className="h-4 w-4 mr-1" />
                  Share Milestone:
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="button-hover-effect text-blue-600 dark:text-blue-400 relative overflow-hidden group"
                  onClick={() => shareOnSocial('facebook', calculateAge())}
                >
                  <motion.div 
                    className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <Facebook className="h-4 w-4 mr-1" />
                  Facebook
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="button-hover-effect text-blue-400 relative overflow-hidden group"
                  onClick={() => shareOnSocial('twitter', calculateAge())}
                >
                  <motion.div 
                    className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <Twitter className="h-4 w-4 mr-1" />
                  Twitter
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="button-hover-effect text-gray-600 dark:text-gray-400 relative overflow-hidden group"
                  onClick={() => shareOnSocial('native', calculateAge())}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {musicPlaying ? (
            <Button 
              variant="outline" 
              className="button-hover-effect flex gap-2 items-center relative overflow-hidden group dark:bg-gray-800 dark:text-white" 
              onClick={stopMusic}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <VolumeX className="h-5 w-5" />
              Stop Music
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="button-hover-effect flex gap-2 items-center relative overflow-hidden group dark:bg-gray-800 dark:text-white" 
              onClick={playMusic}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <Music className="h-5 w-5" />
              Play Music
            </Button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex justify-center gap-4 pt-4"
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full h-12 w-12 button-hover-effect relative overflow-hidden group"
              onClick={() => shareOnSocial('facebook', celebrationMessage)}
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <Facebook className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full h-12 w-12 button-hover-effect relative overflow-hidden group"
              onClick={() => {
                window.open('https://www.instagram.com/')
              }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <Instagram className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full h-12 w-12 button-hover-effect relative overflow-hidden group"
              onClick={() => shareOnSocial('twitter', celebrationMessage)}
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <Twitter className="h-4 w-4 text-blue-400" />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full h-12 w-12 button-hover-effect relative overflow-hidden group"
              onClick={() => shareOnSocial('native', celebrationMessage)}
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <Share2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </Button>
          </motion.div>
        </motion.div>
        
        <div className="pt-8 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDeveloperInfo(true)}
            className="text-xs opacity-70 hover:opacity-100 transition-opacity dark:text-gray-300"
          >
            Developed by G.Thangella
          </Button>
        </div>

        {showDeveloperInfo && (
          <DeveloperInfoCard onClose={() => setShowDeveloperInfo(false)} isDarkMode={isDarkMode} />
        )}
      </motion.div>

      <audio 
        ref={musicRef} 
        src="https://media.bensound.com/bensound-happybirthday.mp3" 
        preload="auto"
        loop
      />
      <audio 
        ref={maleVoiceRef} 
        src="https://media.bensound.com/bensound-jazzyfrenchy.mp3"
        preload="auto"
      />
      <audio 
        ref={femaleVoiceRef} 
        src="https://media.bensound.com/bensound-cute.mp3"
        preload="auto"
      />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .gradient-animate {
          background-size: 200% auto;
          animation: gradient-text 3s ease infinite;
        }
        
        /* Fix for WebKit text fill */
        .text-transparent.bg-clip-text {
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        /* Improved date picker styling */
        .date-picker input[type="number"] {
          appearance: none;
          -moz-appearance: textfield;
        }
        
        .date-picker input[type="number"]::-webkit-inner-spin-button,
        .date-picker input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        /* Add scrollable number input */
        .year-scroller {
          max-height: 200px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(100, 100, 100, 0.5) transparent;
        }
        
        .year-scroller::-webkit-scrollbar {
          width: 6px;
        }
        
        .year-scroller::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .year-scroller::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.5);
          border-radius: 6px;
        }
      `}} />
    </div>
  );
}
