import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import _ from 'lodash'
import Time from '../Time'
import './styles.sass'

const PostListView = ({ posts }) => (
  <div id="posts-container">
    {posts.map(({ title, author = {}, thumbnail, slug, description, date }) => {
      const { name = '', img = '' } = author
      const thumbExists = Boolean(thumbnail)
      return (
        <div className="post" key={slug}>
          <div className="article" style={thumbExists ? {} : { width: '90%' }}>
            {thumbExists && (
              <Link to={slug}>
                {thumbExists &&
                  (typeof thumbnail === 'string' ? (
                    <img
                      alt={title}
                      className="articleimage desktop"
                      src={thumbnail}
                    />
                  ) : (
                    <Img
                      alt={title}
                      className="articleimage desktop"
                      fluid={thumbnail.childImageSharp.fluid}
                    />
                  ))}
              </Link>
            )}
            <div className="articletop">
              <Link style={{ textDecoration: 'none' }} to={slug}>
                <div className="mobile-articletop">
                  <div className="articlelink">{title}</div>
                  {thumbExists &&
                    (typeof thumbnail === 'string' ? (
                      <img
                        alt={title}
                        className="articleimage mobile"
                        src={thumbnail}
                      />
                    ) : (
                      <Img
                        alt={title}
                        className="articleimage mobile"
                        fluid={thumbnail.childImageSharp.fluid}
                      />
                    ))}
                </div>
                <p className="articlepreview">{description}</p>
              </Link>
              <div className="author-container">
                <Link
                  style={{ textDecoration: 'none' }}
                  to={`/authors/${_.kebabCase(name)}`}
                >
                  <div className="authorname">{name}</div>
                </Link>
                <Time date={date} size="med" />
              </div>
            </div>
          </div>
          <br />
        </div>
      )
    })}
  </div>
)

export default PostListView
