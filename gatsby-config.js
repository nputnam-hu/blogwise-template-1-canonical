const { token, apiUrl } = require('./config')

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Rubik:300,400`],
      },
    },
    {
      resolve: 'gatsby-source-blogwise',
      options: {
        token,
        apiUrl,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: 'UA-140389458-1',
      },
    },
    'gatsby-plugin-purgecss', // must be after other CSS plugins,
    `gatsby-plugin-typescript`,
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
