/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        spaceToLeft: {
          "0%": { transform: "translateX(200%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        },
      },
      animation: {
        spaceToLeft: "spaceToLeft 1s ease-in-out forwards",
        meteor: "meteor 5s linear infinite",
      },
    },
  },
  plugins: [],
};