import React from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SharingButtonsProps {
  elementRef: React.RefObject<HTMLDivElement>;
  filename: string;
  title: string;
  isDarkMode: boolean;
  includeWhatsapp?: boolean;
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

export default function SharingButtons({ elementRef, filename, title, isDarkMode, includeWhatsapp = true }: SharingButtonsProps) {
  const { toast } = useToast();

  const handleShare = async (platform: 'facebook' | 'twitter' | 'instagram' | 'email' | 'download' | 'whatsapp') => {
    if (!elementRef.current) return;

    try {
      // Show toast when starting capture
      toast({
        title: "Capturing content...",
        description: "Please wait while we prepare your image.",
      });
      
      // Capture the element as an image using html2canvas with improved quality settings
      const canvas = await html2canvas(elementRef.current, {
        scale: 3, // Higher quality for better sharing
        backgroundColor: isDarkMode ? '#111827' : '#ffffff',
        logging: false,
        allowTaint: true,
        useCORS: true
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      const blob = await fetch(dataUrl).then(res => res.blob());
      const file = new File([blob], `${filename}.png`, { type: 'image/png' });
      
      // Success toast
      toast({
        title: "Image captured!",
        description: "Now sharing your content.",
      });
      
      switch (platform) {
        case 'facebook':
          try {
            // Use Web Share API if available for better mobile experience
            if (navigator.share) {
              navigator.share({
                title: title,
                text: `${title} - Special celebration card`,
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
                title: title,
                text: `${title} - Special celebration card`,
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
              
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} - Special celebration card`)}`, '_blank', 'width=600,height=400');
              
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
                title: title,
                text: `${title} - Special celebration card`,
                files: [file]
              }).catch(err => {
                console.log("Web Share API error:", err);
                // If modern sharing fails, fallback to mailto link
                const bodyText = `${title} - Special celebration card (Image attached)`;
                window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(bodyText)}`;
                
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
              const bodyText = `${title} - Special celebration card (Image attached)`;
              window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(bodyText)}`;
              
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
            // Try to use Web Share API for better mobile experience
            if (navigator.share) {
              navigator.share({
                title: title,
                text: `${title} - Special celebration card`,
                files: [file]
              }).catch(err => {
                console.log("Web Share API error:", err);
                // If sharing fails, try WhatsApp URL
                const waLink = document.createElement('a');
                waLink.download = `${filename}.png`;
                waLink.href = dataUrl;
                waLink.click();
                
                // Open WhatsApp web with meaningful text
                window.open(`https://wa.me/?text=${encodeURIComponent(`${title} - Special celebration card`)}`, '_blank');
                
                toast({
                  title: "Image downloaded for WhatsApp",
                  description: "Open WhatsApp and select this image to share.",
                });
              });
            } else {
              // Fallback for browsers without Web Share API
              const waLink = document.createElement('a');
              waLink.download = `${filename}.png`;
              waLink.href = dataUrl;
              waLink.click();
              
              // Open WhatsApp web with meaningful text
              window.open(`https://wa.me/?text=${encodeURIComponent(`${title} - Special celebration card`)}`, '_blank');
              
              toast({
                title: "Image downloaded for WhatsApp",
                description: "Open WhatsApp and select this image to share.",
              });
            }
          } catch (error) {
            console.error('WhatsApp sharing error:', error);
            // Fallback to basic download
            const waLink = document.createElement('a');
            waLink.download = `${filename}.png`;
            waLink.href = dataUrl;
            waLink.click();
            
            toast({
              title: "WhatsApp sharing failed",
              description: "The image has been downloaded. You can manually share it on WhatsApp.",
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
      console.error('Error sharing:', error);
      toast({
        title: "Sharing failed",
        description: "There was an error capturing or sharing the content.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center gap-1">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleShare('facebook')}
        className={`p-1.5 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
        title="Share on Facebook"
      >
        <Facebook size={16} className="text-blue-500" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleShare('twitter')}
        className={`p-1.5 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
        title="Share on Twitter"
      >
        <Twitter size={16} className="text-blue-400" />
      </motion.button>
      
      {includeWhatsapp && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleShare('whatsapp')}
          className={`p-1.5 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
          title="Share on WhatsApp"
        >
          <WhatsAppIcon size={16} className={isDarkMode ? 'text-green-400' : 'text-green-600'} />
        </motion.button>
      )}
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleShare('instagram')}
        className={`p-1.5 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
        title="Share on Instagram"
      >
        <Instagram size={16} className={isDarkMode ? 'text-pink-400' : 'text-pink-600'} />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleShare('email')}
        className={`p-1.5 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
        title="Share via Email"
      >
        <Mail size={16} className={isDarkMode ? 'text-green-400' : 'text-green-600'} />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleShare('download')}
        className={`p-1.5 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
        title="Download"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      </motion.button>
    </div>
  );
}
