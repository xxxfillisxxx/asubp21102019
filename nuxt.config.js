module.exports = {
    /*
    ** Headers of the page
    */
    build: {
      splitChunks: {
        layouts: true
      }
    },
    head: {
      title: 'АСУБП',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Административная панель АСУБП' },
        { property: 'og:image', content: '/images/image_for_link.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: [
        { src: '/js/jquery-3.4.0.min.js' }
      ],
    },
    plugins: [
      '~/plugins/at-ui',
      '~/plugins/draggable',
      { src: '~/plugins/uikit', ssr: false },
      /*{ src: '~/plugins/ckeditor', ssr: false },*/
      '~plugins/moment',
    ],
    modules: [
      '@nuxtjs/axios',
    ],
    axios: {
      // proxyHeaders: false,
    },
    css: [
      // {src: 'at-ui-style', lang: 'css'},
      // { src: '~/styles/style.css', lang: 'css' },
      // { src: '~/styles/main-style.css', lang: 'css' },
      // { src: 'uikit/dist/css/uikit.css', lang: 'css' }
    ],
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#3B8070' },
    srcDir: 'client',
    /*
    ** Build configuration
    */

    dev: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  };
