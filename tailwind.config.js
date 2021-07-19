module.exports = {
  purge: ['./**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      10: ['10px', '10px'],
      12: ['12px', '12px'],
      14: ['14px', '14px'],
      16: ['16px', '26px'],
      18: ['18px', '30px'],
      22: ['22px', '26px'],
      24: ['24px', '29px'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
