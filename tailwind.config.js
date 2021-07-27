module.exports = {
  purge: ['./**/*.{ts,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      body: "Source Sans Pro, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    },
    fontSize: {
      10: ['10px', '10px'],
      12: ['12px', '12px'],
      14: ['14px', '18px'],
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
    borderColor: (theme) => ({
      DEFAULT: '#ccc',
    }),
    extend: {
      colors: {
        primary: '#009dd3',
        badge: '#18b04c',
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
      },
      minWidth: {
        150: '150px',
        200: '200px',
      },
      maxWidth: {
        1280: '1280px',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
    },
  },
  plugins: [],
}
