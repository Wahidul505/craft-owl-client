module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        light: {

          "primary": "#006E7F",

          "secondary": "#9A86A4",

          "accent": "#83BD75",

          "neutral": "#F3F4F6",

          "base-100": "#ffffff",

          "info": "#FFE69A",

          "success": "#1BBB70",

          "warning": "#F59E0B",

          "error": "#FF4949",
        },
      },
      {
        dark: {

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
