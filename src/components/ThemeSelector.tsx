
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ColorTheme } from '@/pages/Index';

interface ThemeSelectorProps {
  onThemeChange: (theme: ColorTheme) => void;
  currentTheme: ColorTheme;
}

const ThemeSelector = ({ onThemeChange, currentTheme }: ThemeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const themes: { name: ColorTheme; color: string }[] = [
    { name: 'blue', color: 'bg-blue-500' },
    { name: 'pink', color: 'bg-pink-500' },
    { name: 'purple', color: 'bg-purple-500' },
    { name: 'green', color: 'bg-green-500' },
    { name: 'orange', color: 'bg-orange-500' },
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full hover:shadow-md transition-all duration-300 bg-white/80 text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <Palette className="h-5 w-5" />
          </motion.div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2 mr-4 rounded-lg shadow-xl">
        <div className="space-y-2">
          <h4 className="font-medium text-center mb-3">Choose a Theme</h4>
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
              >
                {currentTheme === theme.name && (
                  <Check className="h-4 w-4 text-white" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSelector;
