import React from 'react'
import Link from 'gatsby-link'
import { social, name } from '../../constants/user.json'
import './styles.sass'

const Footer = () => (
  <div id="footer-container">
    <div id="footerlinks">
      <Link to="/about">About</Link>
      <Link to="/search">Search</Link>
      <a href={social.mainSite} target="_blank" rel="noopener noreferrer">
        Visit {name}
      </a>
    </div>
    <div id="poweredby">
      <a href="https://blogwise.co" target="_blank" rel="noopener noreferrer">
        Powered by blogwise
      </a>
    </div>
  </div>
)

export default Footer
