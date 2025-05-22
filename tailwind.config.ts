/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        edupost: {
          blue: {
            DEFAULT: "#103253",
            primary: "#1D4F7A",
            light: '#378FB8'
          },
        },
      },
      boxShadow: {
        "edu-shadow": "0px 0px 15px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
