import React from 'react'
import Link from 'gatsby-link'
import _ from 'lodash'
import { TwitterIcon, FacebookIcon, LinkedinIcon } from 'react-share'

import SearchBar from '../SearchBar'
import searchIcon from './search.svg'
import PostListView from '../PostListView'
import {
  authors,
  tags,
  description as blogDescription,
  social,
  backgroundHexCode,
  logoUri,
  title,
} from '../../constants/user.json'

import './styles.sass'

const IndexContent = ({ posts }) => (
  <div>
    <div id="headercontainer" style={{ background: backgroundHexCode }}>
      <div id="headercontent" style={{ background: backgroundHexCode }}>
        <img id="headerimg" alt="Kaldi Logo" src={logoUri} />
        <br />
        <span id="headertext">{title}</span>
        <div id="headerbottom" style={{ background: backgroundHexCode }}>
          <div id="headersocialbuttons">
            {social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon
                  size={32}
                  style={{ marginBottom: '13px' }}
                  iconBgStyle={{ fill: '#3E5641' }}
                />
              </a>
            )}
            {social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon size={32} iconBgStyle={{ fill: '#3E5641' }} />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon size={32} iconBgStyle={{ fill: '#3E5641' }} />
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
      </div>
    </div>
    <div id="indexcontent-container">
      <div id="content">
        <span id="featured-text">Featured Articles</span>
        <Link id="link-more" to="/latest">
          SEE ALL &gt;
        </Link>
        <div>
          <span className="linebreak left" />
          <span className="linebreak right" />
        </div>
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
              <h2 className="rightheader">Explore Topics</h2>
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
        <h2 className="rightheader">About</h2>
        <img alt="Kalid" src={logoUri} id="rightlogo" />
        <div id="blogdescription">{blogDescription}</div>
        <Link id="moreonblog" to="/about">
          Read More &gt;
        </Link>
        <div id="sociallinks">
          {social.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
              <TwitterIcon size={32} round />
            </a>
          )}
          {social.facebook && (
            <a href={social.facebook} target="_blank" rel="noopener noreferrer">
              <FacebookIcon size={32} round />
            </a>
          )}
          {social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon size={32} round />
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
)

export default IndexContent
