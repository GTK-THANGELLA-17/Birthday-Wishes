
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Instagram, ExternalLink } from 'lucide-react';

interface DeveloperInfoCardProps {
  onClose: () => void;
  isDarkMode: boolean;
}

export default function DeveloperInfoCard({ onClose, isDarkMode }: DeveloperInfoCardProps) {
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl p-6 max-w-lg relative overflow-hidden`}
          initial={{ scale: 0.9, opacity: 0, rotateY: -20 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.9, opacity: 0, rotateY: 20 }}
          transition={{ type: "spring", stiffness: 100 }}
          onClick={e => e.stopPropagation()}
          style={{ 
            transformStyle: 'preserve-3d',
            perspective: '1000px' 
          }}
        >
          {/* Fancy border */}
          <div className="absolute inset-0 p-[1px] overflow-hidden rounded-2xl">
            <div className="h-full w-full rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-20" />
          </div>
          
          {/* Background effects */}
          <div className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl" />
          <div className="absolute -left-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl" />
          
          <div className="relative">
            {/* Close button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 bg-white/10 dark:bg-black/10 text-black dark:text-white" 
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <motion.div 
              className="flex flex-col items-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Developer photo with 3D effect */}
              <motion.div 
                className="relative w-32 h-32 mb-6 preserve-3d"
                whileHover={{ 
                  rotateY: 15,
                  rotateX: -10,
                  scale: 1.05 
                }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div 
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 p-1 preserve-3d"
                  style={{ transform: 'translateZ(-5px)' }}
                >
                  <div className={`w-full h-full rounded-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-1 preserve-3d`}>
                    <div 
                      className="w-full h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-0.5 preserve-3d"
                      style={{ transform: 'translateZ(5px)' }}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden preserve-3d" style={{ transform: 'translateZ(10px)' }}>
                        <img 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
                          alt="G.Thangella" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut" 
                  }}
                  style={{ transform: 'translateZ(20px)' }}
                />
                
                <motion.div 
                  className="absolute -bottom-3 -left-2 w-8 h-8 rounded-full bg-pink-500"
                  animate={{ 
                    y: [0, 10, 0],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                    delay: 0.5 
                  }}
                  style={{ transform: 'translateZ(25px)' }}
                />
              </motion.div>
              
              <motion.h2 
                className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                G.Thangella
              </motion.h2>
              
              <motion.p 
                className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Web Developer & Designer
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4 text-left w-full"
              >
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  Passionate creator of "My Wishes To You" - a platform designed to make birthday celebrations
                  special with personalized wishes, age milestones, and beautiful animations.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    className="relative overflow-hidden group w-full sm:w-auto bg-white dark:bg-gray-900 text-black dark:text-white"
                    onClick={() => window.open('https://www.instagram.com/', '_blank')}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <Instagram className="mr-2 h-5 w-5 text-pink-500" />
                    Follow on Instagram
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="relative overflow-hidden group w-full sm:w-auto bg-white dark:bg-gray-900 text-black dark:text-white"
                    onClick={() => window.open('https://example.com/portfolio', '_blank')}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <ExternalLink className="mr-2 h-5 w-5 text-blue-500" />
                    Visit Website
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          <style dangerouslySetInnerHTML={{ __html: `
            .preserve-3d {
              transform-style: preserve-3d;
            }
          `}} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
