import React from 'react'
import Link from 'gatsby-link'
import _ from 'lodash'
import SearchBar from '../SearchBar'
import searchIcon from './search.svg'
import PostListView from '../PostListView'
import {
  authors,
  tags,
  description as blogDescription,
  social,
  backgroundHexCode,
  bgImgUri,
  headerPhotoUri as logoUri,
  sidebarPhotoUri,
  title,
  name,
} from '../../constants/user.json'
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

const contrastingBgColor = getColorByBgColor(backgroundHexCode)

const IndexContent = ({ posts }) => (
  <div>
    <div
      id="headercontainer"
      style={{
        background: bgImgUri
          ? `url('/header_background.png')`
          : backgroundHexCode,
      }}
    >
      <div
        id="headercontent"
        style={{ background: bgImgUri ? '' : backgroundHexCode }}
      >
        <img id="headerimg" alt="Kaldi Logo" src={logoUri} />
        <br />
        <span id="headertext" style={{ color: contrastingBgColor }}>
          <i>{title}</i>
        </span>
      </div>
    </div>
    <div id="headerbottom">
      <div id="headersocialbuttons">
        {social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <img src={twitter} alt="twitter" />
          </a>
        )}
        {social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="facebook" />
          </a>
        )}
        {social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="linkedin" />
          </a>
        )}
      </div>
      <Link to="/about" id="headerabout">
        | &nbsp;&nbsp;&nbsp;About
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
        <PostListView
          posts={posts.map(({ node }) => ({
            title: node.frontmatter.title,
            author: authors[node.frontmatter.author],
            thumbnail: node.frontmatter.thumbnail,
            slug: node.fields.slug,
            description: node.excerpt,
            date: node.frontmatter.date,
          }))}
        />
      </div>
      <div id="rightcontent">
        <SearchBar />
        <div id="explore-container">
          {Object.values(tags).length > 0 && (
            <React.Fragment>
              <h2 className="rightheader">Topics</h2>
              <ul className="taglist">
                {Object.keys(tags).map(key => (
                  <Link
                    key={key}
                    to={_.kebabCase(tags[key] ? tags[key].name : key)}
                  >
                    <li>{_.upperFirst(tags[key].name)}</li>
                  </Link>
                ))}
              </ul>
            </React.Fragment>
          )}
        </div>
        <h2 className="rightheader">About {name}</h2>
        <img alt={title} src={sidebarPhotoUri} id="rightlogo" />
        <div id="blogdescription">{blogDescription}</div>
        <Link id="moreonblog" to="/about">
          READ MORE &gt;
        </Link>
        <h2 className="rightheader">Find us on</h2>
        <div id="sociallinks">
          {social.twitter && (
            <a
              className="right-sociallink"
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitter} alt="twitter" />
            </a>
          )}
          {social.facebook && (
            <a
              className="right-sociallink"
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="facebook" />
            </a>
          )}
          {social.linkedin && (
            <a
              className="right-sociallink"
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="linkedin" />
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
)

export default IndexContent
