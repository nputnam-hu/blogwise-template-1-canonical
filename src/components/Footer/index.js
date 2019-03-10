import React from 'react'
import Link from 'gatsby-link'
import { social, name } from '../../constants/user.json'
import './styles.sass'

const Footer = () => (
  <div id="footer-container">
    <div id="footerlinks">
      <Link to="/about">ABOUT</Link>
      <Link to="/search">SEARCH</Link>
      <a href={social.mainSite} target="_blank" rel="noopener noreferrer">
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
)

export default Footer
