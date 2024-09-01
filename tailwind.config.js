/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Ensure this includes your entry point if using Vite
    './src/**/*.{js,jsx,ts,tsx}', // Includes all JavaScript and TypeScript files in the src folder
  ],
  theme: {
    extend: {
      // Add custom theme extensions here if needed
    },
  },
  plugins: [],
}
