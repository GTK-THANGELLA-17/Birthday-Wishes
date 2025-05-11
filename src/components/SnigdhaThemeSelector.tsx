
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export type ColorTheme = 'blue' | 'pink' | 'purple' | 'green' | 'orange';

interface ThemeSelectorProps {
  onThemeChange: (theme: ColorTheme) => void;
  currentTheme: ColorTheme;
  isDarkMode: boolean;
}

const SnigdhaThemeSelector = ({ onThemeChange, currentTheme, isDarkMode }: ThemeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const themes: { name: ColorTheme; color: string; label: string }[] = [
    { name: 'blue', color: isDarkMode ? 'bg-blue-400' : 'bg-blue-500', label: 'Ice Blue' },
    { name: 'pink', color: 'bg-pink-500', label: 'Rose Pink' },
    { name: 'purple', color: 'bg-purple-500', label: 'Royal Purple' },
    { name: 'green', color: 'bg-green-500', label: 'Emerald Green' },
    { name: 'orange', color: isDarkMode ? 'bg-orange-300' : 'bg-orange-500', label: 'Sunset Orange' },
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={`rounded-full hover:shadow-md transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 text-white border-gray-700' 
              : 'bg-white/80 text-gray-800 border-gray-200'
          }`}
        >
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <Palette className="h-5 w-5" />
          </motion.div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-56 p-3 mr-4 rounded-lg shadow-xl ${
        isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="space-y-3">
          <h4 className={`font-medium text-center mb-3 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>Choose a Theme</h4>
          <div className="grid grid-cols-5 gap-2">
            {themes.map((theme) => (
              <motion.button
                key={theme.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-8 h-8 rounded-full ${theme.color} flex items-center justify-center`}
                onClick={() => {
                  onThemeChange(theme.name);
                  setIsOpen(false);
                }}
                title={theme.label}
              >
                {currentTheme === theme.name && (
                  <Check className="h-4 w-4 text-white" />
                )}
              </motion.button>
            ))}
          </div>
          <div className="mt-2 text-xs text-center text-muted-foreground">
            {themes.find(t => t.name === currentTheme)?.label || 'Select a theme'}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SnigdhaThemeSelector;
