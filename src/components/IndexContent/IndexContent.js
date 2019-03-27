import React from 'react'
import Img from 'gatsby-image'
import Background from 'gatsby-background-image'
import Link from 'gatsby-link'
import _ from 'lodash'
import SearchBar from '../SearchBar'
import searchIcon from './search.svg'
import PostListView from '../PostListView'
import linkedin from './linkedin.png'
import facebook from './facebook.png'
import twitter from './twitter.png'
import './styles.sass'

function getColorByBgColor(bgColor) {
  if (!bgColor) {
    return ''
  }
  return parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2 ? '#000' : '#fff'
}

const IndexContent = ({ posts, blogData, tags }) => {
  const {
    title,
    name,
    description,
    backgroundHexCode,
    header,
    sidebar,
    background,
    twitterUrl,
    facebookUrl,
    linkedinUrl,
  } = blogData
  const contrastingBgColor = getColorByBgColor(backgroundHexCode)
  const HeaderContent = (
    <div
      id="headercontent"
      style={{ background: background ? '' : backgroundHexCode }}
    >
      <Img
        id="headerimg"
        alt={`${name} logo`}
        fixed={header.childImageSharp.fixed}
      />
      <br />
      <span id="headertext" style={{ color: contrastingBgColor }}>
        <i>{title}</i>
      </span>
    </div>
  )
  return (
    <div>
      {background.childImageSharp ? (
        <Background
          className="header-container"
          fluid={background.childImageSharp.fluid}
        >
          {HeaderContent}
        </Background>
      ) : (
        <div
          style={{ background: backgroundHexCode }}
          className="header-container"
        >
          {HeaderContent}
        </div>
      )}
      <div id="headerbottom">
        {(twitterUrl || facebookUrl || linkedinUrl) && (
          <div id="headersocialbuttons">
            {twitterUrl && (
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                <img src={twitter} alt="twitter" />
              </a>
            )}
            {facebookUrl && (
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="facebook" />
              </a>
            )}
            {linkedinUrl && (
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <img src={linkedin} alt="linkedin" />
              </a>
            )}
            <span style={{ color: '#B3B3B3', marginRight: '15px' }}>|</span>
          </div>
        )}
        <Link to="/about" id="headerabout">
          About
        </Link>
        <Link to="/search" id="headersearch">
          <img src={searchIcon} alt="Search Posts" />
        </Link>
      </div>
      <div id="indexcontent-container">
        <div id="content">
          <span id="featured-text">FEATURED ARTICLES</span>
          <Link id="link-more" to="/latest">
            SEE ALL
          </Link>
          <br />
          <br />
          <br />
          <PostListView posts={posts.map(p => p.node)} />
        </div>
        <div id="rightcontent">
          <SearchBar />
          <div id="explore-container">
            {tags && tags.length > 0 && (
              <>
                <h2 className="rightheader">Topics</h2>
                <ul className="taglist">
                  {tags.map(({ node: { slug, name: tagName } }) => (
                    <Link key={slug} to={slug}>
                      <li>{_.upperFirst(tagName)}</li>
                    </Link>
                  ))}
                </ul>
              </>
            )}
          </div>
          <h2 className="rightheader">About {name}</h2>
          <Img
            alt={`${name} logo`}
            fixed={sidebar.childImageSharp.fixed}
            id="rightlogo"
          />
          <div id="blogdescription">{description}</div>
          <Link id="moreonblog" to="/about">
            READ MORE &gt;
          </Link>
          {(twitterUrl || facebookUrl || linkedinUrl) && (
            <>
              <h2 className="rightheader">Find us on</h2>
              <div id="sociallinks">
                {twitterUrl && (
                  <a
                    className="right-sociallink"
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={twitter} alt="twitter" />
                  </a>
                )}
                {facebookUrl && (
                  <a
                    className="right-sociallink"
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={facebook} alt="facebook" />
                  </a>
                )}
                {linkedinUrl && (
                  <a
                    className="right-sociallink"
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={linkedin} alt="linkedin" />
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default IndexContent
