import React from 'react'
import { Link } from 'gatsby'
import { logoUri, backgroundHexCode } from '../../constants/user.json'
import './styles.sass'

const Navbar = () => (
  <div className="navbar-container" style={{ background: backgroundHexCode }}>
    <Link to="/" className="navbar-item" title="Logo">
      <img id="navbar-logo" src={logoUri} alt="Kaldi" />
    </Link>
  </div>
)

export default Navbar
