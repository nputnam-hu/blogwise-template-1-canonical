import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './Navbar.module.sass'

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
          navbarHexCode
          header {
            childImageSharp {
              fixed(height: 40, quality: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    `}
    render={({ blogData: { navbarHexCode, header } }) => (
      <div className={styles.Navbar} style={{ background: navbarHexCode }}>
        <Link to="/" className={styles.Navbar__logoContainer} title="Logo">
          <Img
            className={styles.Navbar__logo}
            fixed={header.childImageSharp.fixed}
            alt="logo"
          />
        </Link>
        <div className={styles.Navbar__links}>
          {customNavbarLinks.map(({ link, name }) => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={link}
              alt={name}
              style={{ color: getColorByBgColor(navbarHexCode) }}
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
