import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import './styles.sass'

const Footer = () => (
  <StaticQuery
    query={graphql`
      query Footer {
        blogData {
          name
          mainSiteUrl
        }
      }
    `}
    render={({ blogData: { name, mainSiteUrl } }) => (
      <div id="footer-container">
        <div id="footerlinks">
          <Link to="/about">ABOUT</Link>
          <Link to="/search">SEARCH</Link>
          <a href={mainSiteUrl} target="_blank" rel="noopener noreferrer">
            Visit {name}
          </a>
        </div>
        <div id="poweredby">
          <a
            href="https://www.blogwise.co?rel=blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            powered by blogwise
          </a>
        </div>
      </div>
    )}
  />
)

export default Footer
