/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "pale-blue": "#E1EAF9",
        "sky-blue": "#B5E8F6",
        "deep-blue": "#1F299C",
        "azure-blue": "#007FFF",
        "dashboard-bg": "#f7fafc",
      },
    },
  },
  plugins: [],
};
