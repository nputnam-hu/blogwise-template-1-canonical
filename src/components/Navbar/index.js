import React from 'react'
import { Link } from 'gatsby'
import {
  logoUri,
  backgroundHexCode,
  customNavbarLinks,
} from '../../constants/user.json'
import './styles.sass'

function getColorByBgColor(bgColor) {
  if (!bgColor) {
    return ''
  }
  return parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2 ? '#000' : '#fff'
}

const Navbar = () => (
  <div className="navbar-container" style={{ background: backgroundHexCode }}>
    <Link to="/" className="navbar-item" title="Logo">
      <img id="navbar-logo" src={logoUri} alt="Kaldi" />
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
)

export default Navbar
