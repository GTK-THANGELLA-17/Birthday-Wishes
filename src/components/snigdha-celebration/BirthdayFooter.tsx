import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BirthdayFooterProps {
  isDarkMode: boolean;
  showMessage: boolean;
  onReturnHome: () => void;
}

export function BirthdayFooter({
  isDarkMode,
  showMessage,
  onReturnHome,
}: BirthdayFooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: showMessage ? 1 : 0 }}
      transition={{ duration: 1, delay: 2 }}
      className={`fixed bottom-0 w-full z-50 text-center px-4 py-6 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      } shadow-md`}
    >
      {/* Birthday message */}
      <motion.p
        className={`text-lg font-birthday ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}
        animate={{
          scale: [1, 1.05, 1],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        Wishing you a day as special as you are!
      </motion.p>

      {/* Return Home Button */}
      <div className="flex justify-center mt-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: isDarkMode
              ? [
                  '0 0 0px rgba(186,230,253,0)',
                  '0 0 15px rgba(186,230,253,0.5)',
                  '0 0 0px rgba(186,230,253,0)',
                ]
              : [
                  '0 4px 12px rgba(96,165,250,0.2)',
                  '0 6px 16px rgba(96,165,250,0.4)',
                  '0 4px 12px rgba(96,165,250,0.2)',
                ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          <Button
            onClick={onReturnHome}
            className={`relative button-glow btn-edge-effect shadow-md ${
              isDarkMode
                ? 'bg-blue-300 hover:bg-blue-400 text-gray-900 border border-blue-200'
                : 'bg-blue-300 text-gray-900 border-2 border-blue-400 hover:bg-blue-400'
            }`}
          >
            Return Home
          </Button>
        </motion.div>
      </div>

      {/* Developer info and Instagram */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.5 }}
        className="mt-6 flex items-center justify-center gap-2"
      >
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Developed by GTK
        </p>
        <motion.a
          href="https://www.instagram.com/g_thangella_k"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
          whileTap={{ scale: 0.9 }}
          className="transition-all duration-300"
        >
          <Instagram
            className={`h-5 w-5 ${
              isDarkMode ? 'text-orange-300' : 'text-blue-500'
            }`}
          />
        </motion.a>
      </motion.div>
    </motion.footer>
  );
}
