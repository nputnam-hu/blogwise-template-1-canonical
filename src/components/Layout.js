import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Navbar from './Navbar'
import Footer from './Footer'

const TemplateWrapper = ({ showNav = true, children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        blogData {
          title
          description
        }
      }
    `}
    render={data => (
      <div>
        <Helmet
          defaultTitle={data.blogData.title}
          titleTemplate={`%s - ${data.blogData.title}`}
        >
          <html lang="en" />
          <meta name="description" content={data.blogData.description} />
          <link rel="stylesheet" href="https://use.typekit.net/nxa2kay.css" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/img/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="/img/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/img/favicon-16x16.png"
            sizes="16x16"
          />

          <link
            rel="mask-icon"
            href="/img/safari-pinned-tab.svg"
            color="#ff4400"
          />
          <meta name="theme-color" content="#fff" />

          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={data.blogData.title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />
        </Helmet>
        {showNav && <Navbar />}
        <div>{children}</div>
        <Footer />
      </div>
    )}
  />
)

export default TemplateWrapper
