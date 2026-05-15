/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-blue": "#0051B2",
        "teal": "#54CCCC",
        "dark-navy": "#080C14",
        "surface": "#131929",
        "danger": "#FF4D4F",
        "amber": "#FA8C16",
        "teal-bg": "#ECFEFF",
        "border-color": "#1E2A40",
        "text-muted": "#8A9BBE",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #0051B2 0%, #003d87 100%)",
        "gradient-teal": "linear-gradient(135deg, #54CCCC 0%, #3aabab 100%)",
        "gradient-surface": "linear-gradient(180deg, #131929 0%, #0d1520 100%)",
      },
      boxShadow: {
        "card": "0 4px 24px rgba(0, 0, 0, 0.4)",
        "glow-blue": "0 0 20px rgba(0, 81, 178, 0.4)",
        "glow-teal": "0 0 20px rgba(84, 204, 204, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-in": "slideIn 0.3s ease-in-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
