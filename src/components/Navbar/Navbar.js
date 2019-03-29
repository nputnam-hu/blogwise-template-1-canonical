import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import './styles.sass'

const { customNavbarLinks } = require('../../../config')

function getColorByBgColor(bgColor) {
  if (!bgColor) {
    return ''
  }
  return parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2 ? '#000' : '#fff'
}

const Navbar = () => (
  <StaticQuery
    query={graphql`
      query Navbar {
        blogData {
          backgroundHexCode
          header {
            childImageSharp {
              fixed(height: 40) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    `}
    render={({ blogData: { backgroundHexCode, header } }) => (
      <div
        className="navbar-container"
        style={{ background: backgroundHexCode }}
      >
        <Link to="/" className="navbar-item" title="Logo">
          <Img
            className="navbar-logo"
            fixed={header.childImageSharp.fixed}
            alt="logo"
          />
        </Link>
        <div id="navbar-links">
          {customNavbarLinks.map(({ link, name }) => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={link}
              alt={name}
              style={{ color: getColorByBgColor(backgroundHexCode) }}
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    )}
  />
)

export default Navbar
