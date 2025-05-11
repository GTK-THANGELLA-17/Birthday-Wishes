import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import { Facebook, Twitter, Instagram, Mail, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareAgeStatsProps {
  elementRef: React.RefObject<HTMLDivElement>;
  isDarkMode: boolean;
  filename: string;
}

// Custom WhatsApp icon since it's not available in lucide-react
const WhatsAppIcon = ({ size = 24, className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M17.6 6.8A7.8 7.8 0 0 0 12 4c-4.4 0-8 3.6-8 8 0 1.4.4 2.8 1 4l-1 4 4-1c1.2.6 2.6 1 4 1 4.4 0 8-3.6 8-8 0-2.2-.8-4.2-2.4-5.8v0z" />
      <path d="m13.5 14.4-1.2.6c-1.1.6-2.6.1-3.4-.6m9.4-5.5c-.2-1-1.2-2.3-2-2.9"></path>
    </svg>
  );
};

export default function ShareAgeStats({ elementRef, isDarkMode, filename }: ShareAgeStatsProps) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const { toast } = useToast();
  
  // Function to capture and share the element as an image
  const captureAndShare = async (shareType: 'facebook' | 'twitter' | 'email' | 'instagram' | 'whatsapp' | 'download') => {
    if (!elementRef.current) return;
    
    try {
      // Show toast when starting capture
      toast({
        title: "Capturing content...",
        description: "Please wait while we prepare your image.",
      });
      
      const canvas = await html2canvas(elementRef.current, {
        scale: 3, // Higher quality for better sharing
        backgroundColor: isDarkMode ? '#111827' : '#ffffff',
        logging: false,
        allowTaint: true,
        useCORS: true
      });
      
      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/png');
      const blob = await fetch(dataUrl).then(res => res.blob());
      const file = new File([blob], `${filename}.png`, { type: 'image/png' });
      
      // Success toast
      toast({
        title: "Image captured!",
        description: "Now sharing your content.",
      });
      
      const shareTitle = "Birthday Celebration Age Stats";
      const shareText = "Birthday Age Milestones - Special celebration card";
      
      // Share based on type
      switch (shareType) {
        case 'facebook':
          try {
            // Use Web Share API if available for better mobile experience
            if (navigator.share) {
              navigator.share({
                title: shareTitle,
                text: shareText,
                files: [file]
              }).catch(err => {
                console.log("Web Share API error:", err);
                // Fallback to old method if share fails
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400');
                
                // Download the image as fallback
                const fbLink = document.createElement('a');
                fbLink.download = `${filename}.png`;
                fbLink.href = dataUrl;
                fbLink.click();
                
                toast({
                  title: "Direct sharing not supported",
                  description: "The image has been downloaded. You can manually upload it to Facebook.",
                });
              });
            } else {
              // Fallback for browsers without Web Share API
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=400');
              
              // Download the image as fallback
              const fbLink = document.createElement('a');
              fbLink.download = `${filename}.png`;
              fbLink.href = dataUrl;
              fbLink.click();
              
              toast({
                title: "Direct sharing not supported",
                description: "The image has been downloaded. You can manually upload it to Facebook.",
              });
            }
          } catch (error) {
            console.error('Facebook sharing error:', error);
            // Always provide download fallback
            const fbLink = document.createElement('a');
            fbLink.download = `${filename}.png`;
            fbLink.href = dataUrl;
            fbLink.click();
            
            toast({
              title: "Sharing to Facebook failed",
              description: "The image has been downloaded instead. You can manually upload it.",
            });
          }
          break;
          
        case 'twitter':
          try {
            // Use Web Share API if available
            if (navigator.share) {
              navigator.share({
                title: shareTitle,
                text: shareText,
                files: [file]
              }).catch(err => {
                console.log("Web Share API error:", err);
                // Fallback to download if share fails
                const twitterLink = document.createElement('a');
                twitterLink.download = `${filename}.png`;
                twitterLink.href = dataUrl;
                twitterLink.click();
                
                toast({
                  title: "Direct sharing not supported",
                  description: "The image has been downloaded. You can manually upload it to Twitter.",
                });
              });
            } else {
              // Download for manual sharing as Twitter doesn't support direct image upload via URL
              const twitterLink = document.createElement('a');
              twitterLink.download = `${filename}.png`;
              twitterLink.href = dataUrl;
              twitterLink.click();
              
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank', 'width=600,height=400');
              
              toast({
                title: "Image downloaded",
                description: "The image has been downloaded. You can attach it to your tweet manually.",
              });
            }
          } catch (error) {
            console.error('Twitter sharing error:', error);
            // Always provide download fallback
            const twitterLink = document.createElement('a');
            twitterLink.download = `${filename}.png`;
            twitterLink.href = dataUrl;
            twitterLink.click();
            
            toast({
              title: "Sharing to Twitter failed",
              description: "The image has been downloaded instead. You can manually upload it.",
            });
          }
          break;
          
        case 'instagram':
          // Instagram doesn't have a direct web sharing API, so we download the image instead
          const instagramLink = document.createElement('a');
          instagramLink.download = `${filename}.png`;
          instagramLink.href = dataUrl;
          instagramLink.click();
          
          toast({
            title: "Image downloaded for Instagram",
            description: "Open Instagram and select this image to share.",
          });
          break;
          
        case 'email':
          try {
            // Try to use the modern email sharing with attachments if available
            if (navigator.share) {
              navigator.share({
                title: shareTitle,
                text: shareText,
                files: [file]
              }).catch(err => {
                console.log("Web Share API error:", err);
                // If modern sharing fails, fallback to mailto link
                const bodyText = "Birthday Age Milestones - Special celebration card (Image attached)";
                window.location.href = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(bodyText)}`;
                
                // Also download the image for attachment
                const emailLink = document.createElement('a');
                emailLink.download = `${filename}.png`;
                emailLink.href = dataUrl;
                emailLink.click();
                
                toast({
                  title: "Image downloaded for email",
                  description: "Attach the downloaded image to your email manually.",
                });
              });
            } else {
              // Fallback to traditional mailto
              const bodyText = "Birthday Age Milestones - Special celebration card (Image attached)";
              window.location.href = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(bodyText)}`;
              
              // Also download the image for attachment
              const emailLink = document.createElement('a');
              emailLink.download = `${filename}.png`;
              emailLink.href = dataUrl;
              emailLink.click();
              
              toast({
                title: "Image downloaded for email",
                description: "Attach the downloaded image to your email manually.",
              });
            }
          } catch (error) {
            console.error('Email sharing error:', error);
            // Fallback to basic download
            const emailLink = document.createElement('a');
            emailLink.download = `${filename}.png`;
            emailLink.href = dataUrl;
            emailLink.click();
            
            toast({
              title: "Direct email sharing failed",
              description: "The image has been downloaded instead. You can manually attach it to an email.",
            });
          }
          break;
          
        case 'whatsapp':
          try {
            if (navigator.share) {
              navigator.share({
                title: shareTitle,
                text: shareText,
                files: [file]
              }).catch(err => {
                console.log("Web Share API error:", err);
                // If modern sharing fails, fallback to traditional WhatsApp link
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
                
                // Also provide the image download
                const whatsappLink = document.createElement('a');
                whatsappLink.download = `${filename}.png`;
                whatsappLink.href = dataUrl;
                whatsappLink.click();
                
                toast({
                  title: "Image downloaded for WhatsApp",
                  description: "Share the downloaded image on WhatsApp manually.",
                });
              });
            } else {
              // Fallback to traditional WhatsApp share
              window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
              
              // Also provide the image download
              const whatsappLink = document.createElement('a');
              whatsappLink.download = `${filename}.png`;
              whatsappLink.href = dataUrl;
              whatsappLink.click();
              
              toast({
                title: "Image downloaded for WhatsApp",
                description: "Share the downloaded image on WhatsApp manually.",
              });
            }
          } catch (error) {
            console.error('WhatsApp sharing error:', error);
            // Fallback to basic download
            const whatsappLink = document.createElement('a');
            whatsappLink.download = `${filename}.png`;
            whatsappLink.href = dataUrl;
            whatsappLink.click();
            
            toast({
              title: "WhatsApp sharing failed",
              description: "The image has been downloaded instead. You can manually share it on WhatsApp.",
            });
          }
          break;
          
        case 'download':
          const link = document.createElement('a');
          link.download = `${filename}.png`;
          link.href = dataUrl;
          link.click();
          
          toast({
            title: "Image downloaded",
            description: "Your image has been saved to your device.",
          });
          break;
      }
    } catch (error) {
      console.error('Error capturing or sharing:', error);
      toast({
        title: "Sharing failed",
        description: "There was an error capturing or sharing the content.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center justify-start gap-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowShareOptions(!showShareOptions)}
          className={`flex items-center gap-2 ${
            isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </motion.div>
      
      <AnimatePresence>
        {showShareOptions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            className="flex items-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => captureAndShare('facebook')}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <Facebook size={16} className="text-blue-500" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => captureAndShare('twitter')}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <Twitter size={16} className="text-blue-400" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => captureAndShare('whatsapp')}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <WhatsAppIcon size={16} className={isDarkMode ? 'text-green-400' : 'text-green-600'} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => captureAndShare('instagram')}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <Instagram size={16} className={isDarkMode ? 'text-pink-400' : 'text-pink-600'} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => captureAndShare('email')}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <Mail size={16} className={isDarkMode ? 'text-green-400' : 'text-green-600'} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => captureAndShare('download')}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
