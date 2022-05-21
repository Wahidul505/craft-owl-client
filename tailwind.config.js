module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        light: {

          "primary": "#92B4EC",

          "secondary": "#FFD24C",

          "accent": "#97C4B8",

          "neutral": "#F3F4F6",

          "base-100": "#ffffff",

          "info": "#FFE69A",

          "success": "#1BBB70",

          "warning": "#F59E0B",

          "error": "#FF4949",
        },
      },
      {
        mytheme: {

          "primary": "#92B4EC",

          "secondary": "#FFD24C",

          "accent": "#97C4B8",

          "neutral": "#F3F4F6",

          "base-100": "#222",

          "info": "#FFE69A",

          "success": "#1BBB70",

          "warning": "#F59E0B",

          "error": "#FF4949",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
