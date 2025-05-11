
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Lato', 'Montserrat', 'Inter', 'system-ui', 'sans-serif'],
				serif: ['SF Pro Text', 'Georgia', 'serif'],
				mono: ['SF Mono', 'monospace'],
				display: ['Pacifico', 'cursive'],
				birthday: ['Dancing Script', 'cursive'],
				lato: ['Lato', 'sans-serif']
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				birthday: {
					// Light mode: ice blue, black, white
					blue: '#3B82F6', // ice blue
					black: '#111827', // black
					white: '#FFFFFF', // white
					
					// Dark mode: ice blue, charcoal black, light orange 
					darkBlue: '#60A5FA', // ice blue
					charcoal: '#1F2937', // charcoal black
					orange: '#FB923C' // light orange
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'premium': '0 10px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
				'premium-hover': '0 15px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2) inset',
				'glass': '0 8px 32px rgba(31, 38, 135, 0.15)',
				'glass-hover': '0 10px 40px rgba(31, 38, 135, 0.2)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)'
					},
				},
				'fade-out': {
					'0%': { 
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': { 
						opacity: '0',
						transform: 'translateY(10px)'
					},
				},
				'scale-in': {
					'0%': { 
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': { 
						transform: 'scale(1)',
						opacity: '1'
					},
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' },
				},
				'slide-in': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				'slide-out': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse': {
					'0%, 100%': { 
						opacity: '1',
						transform: 'scale(1)' 
					},
					'50%': { 
						opacity: '0.85',
						transform: 'scale(0.98)' 
					},
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-200% 0',
					},
					'100%': {
						backgroundPosition: '200% 0',
					},
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'glitch': {
					'0%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(-2px, -2px)' },
					'60%': { transform: 'translate(2px, 2px)' },
					'80%': { transform: 'translate(2px, -2px)' },
					'100%': { transform: 'translate(0)' },
				},
				'confetti-fall': {
					'0%': { 
						transform: 'translateY(-100px) rotate(0deg)', 
						opacity: '1'
					},
					'100%': { 
						transform: 'translateY(100vh) rotate(720deg)', 
						opacity: '0'
					},
				},
				'balloon-float': {
					'0%, 100%': { 
						transform: 'translateY(0) rotate(-3deg)', 
					},
					'50%': { 
						transform: 'translateY(-20px) rotate(3deg)', 
					},
				},
				'birthday-text-color': {
					'0%': { color: '#FF5E78' },
					'25%': { color: '#FFD166' },
					'50%': { color: '#06D6A0' },
					'75%': { color: '#118AB2' },
					'100%': { color: '#FF5E78' },
				},
				'card-float': {
					'0%, 100%': { 
						transform: 'translateY(0) rotate(0deg)', 
						boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
					},
					'50%': { 
						transform: 'translateY(-10px) rotate(2deg)', 
						boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
					},
				},
				'sparkle': {
					'0%': { 
						transform: 'scale(0) rotate(0deg)',
						opacity: '0'
					},
					'50%': { 
						transform: 'scale(1) rotate(180deg)',
						opacity: '1'
					},
					'100%': { 
						transform: 'scale(0) rotate(360deg)',
						opacity: '0'
					},
				},
				'3d-tilt': {
					'0%, 100%': { 
						transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' 
					},
					'25%': { 
						transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)' 
					},
					'50%': { 
						transform: 'perspective(1000px) rotateX(0deg) rotateY(10deg)' 
					},
					'75%': { 
						transform: 'perspective(1000px) rotateX(-5deg) rotateY(5deg)' 
					},
				},
				'shine': {
					'0%': { backgroundPosition: '-200% center' },
					'100%': { backgroundPosition: '200% center' },
				},
				'premium-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 0 0 rgba(66, 153, 225, 0)'
					},
					'50%': { 
						boxShadow: '0 0 0 10px rgba(66, 153, 225, 0.3)'
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'fade-out': 'fade-out 0.5s ease-out forwards',
				'scale-in': 'scale-in 0.3s ease-out forwards',
				'scale-out': 'scale-out 0.3s ease-out forwards',
				'slide-in': 'slide-in 0.4s ease-out forwards',
				'slide-out': 'slide-out 0.4s ease-out forwards',
				'float': 'float 3s ease-in-out infinite',
				'pulse': 'pulse 2s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'spin-slow': 'spin-slow 6s linear infinite',
				'glitch': 'glitch 0.2s ease-in-out infinite',
				'enter': 'fade-in 0.5s ease-out, scale-in 0.3s ease-out',
				'exit': 'fade-out 0.5s ease-out, scale-out 0.3s ease-out',
				'confetti-fall': 'confetti-fall 5s linear forwards',
				'balloon-float': 'balloon-float 6s ease-in-out infinite',
				'birthday-text-color': 'birthday-text-color 8s ease-in-out infinite',
				'card-float': 'card-float 4s ease-in-out infinite',
				'sparkle': 'sparkle 2s linear infinite',
				'3d-tilt': '3d-tilt 10s ease-in-out infinite',
				'shine': 'shine 3s linear infinite',
				'premium-pulse': 'premium-pulse 2s ease-in-out infinite',
			},
			backdropBlur: {
				'xs': '2px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
