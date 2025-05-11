
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add font preconnect for performance
const preconnect = document.createElement('link');
preconnect.rel = 'preconnect';
preconnect.href = 'https://fonts.googleapis.com';
document.head.appendChild(preconnect);

const preconnectGstatic = document.createElement('link');
preconnectGstatic.rel = 'preconnect';
preconnectGstatic.href = 'https://fonts.gstatic.com';
preconnectGstatic.crossOrigin = 'anonymous';
document.head.appendChild(preconnectGstatic);

// Add Dancing Script and Lato fonts
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Lato:wght@400;700&display=swap';
document.head.appendChild(fontLink);

// Initialize the app once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Set initial dark/light mode based on user preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }
  
  createRoot(document.getElementById("root")!).render(<App />);
});
