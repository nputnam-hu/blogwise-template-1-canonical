import React from 'react'
import Link from 'gatsby-link'
import { social, backgroundHexCode } from '../../constants/user.json'
import './styles.sass'

const Footer = () => (
  <div id="footer-container" style={{ background: backgroundHexCode }}>
    <div id="footerlinks">
      <Link to="/about">About</Link>
      <Link to="/search">Search</Link>
      <a href={social.mainSite} target="_blank" rel="noopener noreferrer">
        Visit
      </a>
      <span>|</span>
      <a
        href="https://www.blogwise.co"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered By Blogwise
      </a>
    </div>
  </div>
)

export default Footer
