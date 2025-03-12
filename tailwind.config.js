const {heroui} = require("@heroui/theme");
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/components/(card|ripple).js",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        departure: ['DepartureMono', 'monospace']
      },
      colors: {
        beige: '#E3DCC3',
      }
    },
  },
  plugins: [heroui()],
};
