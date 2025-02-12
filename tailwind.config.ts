import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			fontFamily: {
				"gideon-roman": ["Gideon Roman", "serif"],
				"luxurious-roman": ["Luxurious Roman", "serif"],
				seagram: ["Seagram TFB", "serif"]
			},
			colors: {
				border: "#000000",
				input: "#d1d5db",
				ring: "#3b82f6",
				background: {
					DEFAULT: "#efe5d3",
					50: "#130f07",
					100: "#251d0e",
					200: "#4b3a1b",
					300: "#705729",
					400: "#967436",
					500: "#bb9144",
					600: "#c9a769",
					700: "#d6bd8f",
					800: "#e4d3b4",
					900: "#f1e9da",
					950: "#f8f4ec"
				},
				foreground: "#0c0904",
				primary: {
					DEFAULT: "#d2992f",
					foreground: "#0c0904",
					50: "#150f05",
					100: "#2a1e09",
					200: "#543d12",
					300: "#7d5b1c",
					400: "#a77a25",
					500: "#d1982e",
					600: "#daad58",
					700: "#e3c182",
					800: "#edd6ab",
					900: "#f6ead5",
					950: "#faf5ea"
				},
				secondary: {
					DEFAULT: "#bf633c",
					foreground: "#ffffff",
					50: "#130a06",
					100: "#27140c",
					200: "#4e2818",
					300: "#743d25",
					400: "#9b5131",
					500: "#c2653d",
					600: "#ce8464",
					700: "#daa38b",
					800: "#e7c1b1",
					900: "#f3e0d8",
					950: "#f9f0ec"
				},
				destructive: {
					DEFAULT: "#de4040",
					foreground: "#0c0904"
				},
				muted: {
					DEFAULT: "#9ca3af",
					foreground: "#6b7280"
				},
				accent: {
					DEFAULT: "#7b481e",
					foreground: "#ffffff",
					50: "#150c05",
					100: "#29180a",
					200: "#523014",
					300: "#7b481e",
					400: "#a46028",
					500: "#cd7832",
					600: "#d7935b",
					700: "#e1ae84",
					800: "#ebc9ad",
					900: "#f5e4d6",
					950: "#faf1ea"
				},
				popover: {
					DEFAULT: "#edd6ab",
					foreground: "#111827"
				},
				card: {
					DEFAULT: "#edd6ab",
					foreground: "#111827"
				},
				sidebar: {
					DEFAULT: "#1f2937",
					foreground: "#f9fafb",
					primary: "#3b82f6",
					"primary-foreground": "#ffffff",
					accent: "#d2992f",
					"accent-foreground": "#ffffff",
					border: "#e5e7eb",
					ring: "#3b82f6"
				}
			},
			borderRadius: {
				xl: "calc(0.75rem + 4px)",
				lg: "0.75rem",
				md: "calc(0.75rem - 2px)",
				sm: "calc(0.75rem - 4px)"
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--bits-accordion-content-height)" }
				},
				"accordion-up": {
					from: { height: "var(--bits-accordion-content-height)" },
					to: { height: "0" }
				},
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"caret-blink": "caret-blink 1.25s ease-out infinite"
			}
		}
	},
	plugins: [tailwindcssAnimate]
};

export default config;
