const { token, apiUrl } = require('./src/constants/user.json')

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    // {
    //   // must be first source-filesystem call
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
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
        fonts: [`Rubik`],
      },
    },
    {
      resolve: 'gatsby-source-blogwise',
      options: {
        token,
        apiUrl,
      },
    },
    'gatsby-plugin-purgecss', // must be after other CSS plugins,
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
