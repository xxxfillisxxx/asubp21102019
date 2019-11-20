module.exports = {
    /*
    ** Headers of the page
    */
    name: 'index',
    head: {
      title: 'АСУБП',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Административная панель АСУБП' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
      ],
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
      ],
    },
    plugins: [
      // '~/plugins/at-ui',
      // '~/plugins/draggable',
      { src: '~/plugins/uikit', ssr: false }
    ],
    modules: [
      '@nuxtjs/axios',
    ],
    axios: {
      // proxyHeaders: false
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
    srcDir: 'index',
    /*
    ** Build configuration
    */

    dev: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  };