module.exports = {
    content: [
      './content/**/*.md',
      './themes/hugo-landing-page/layouts/partials/**/*.html',
      './themes/hugo-landing-page/layouts/**/*.html',
    ],
theme: {
    extend:
    {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
    },
  },

  corePlugins: {},
  plugins: [],
}
