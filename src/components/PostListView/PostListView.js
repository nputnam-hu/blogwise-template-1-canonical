import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Time from '../Time'
import './styles.sass'

const PostListView = ({ posts }) => (
  <div id="posts-container">
    {posts.map(
      ({
        title,
        description,
        slug,
        publishDate,
        thumbnail,
        thumbnailUri,
        author,
        excerpt,
      }) => {
        const { name, slug: authorSlug } = author
        const thumbExists = Boolean(thumbnail)
        const thumbUriExists = Boolean(thumbnailUri)
        let renderedThumbnail = <div />
        if (thumbExists) {
          renderedThumbnail = (
            <Link to={slug}>
              <Img
                alt={title}
                className="articleimage desktop"
                fluid={thumbnail.childImageSharp.fluid}
              />
            </Link>
          )
        } else if (thumbUriExists) {
          renderedThumbnail = (
            <img
              src={thumbnailUri}
              className="articleimage desktop"
              alt="thumbnail"
            />
          )
        }
        return (
          <div className="post" key={slug}>
            <div
              className="article"
              style={thumbExists ? {} : { width: '100%' }}
            >
              {renderedThumbnail}
              <div className="articletop">
                <Link style={{ textDecoration: 'none' }} to={slug}>
                  <div className="mobile-articletop">
                    <div className="articlelink">{title}</div>
                    {thumbExists && (
                      <Img
                        alt={title}
                        className="articleimage mobile"
                        fluid={thumbnail.childImageSharp.fluid}
                      />
                    )}
                  </div>
                  <p className="articlepreview">{excerpt || description}</p>
                </Link>
                <div className="author-container">
                  <Link style={{ textDecoration: 'none' }} to={authorSlug}>
                    <div className="authorname">{name}</div>
                  </Link>
                  <Time date={publishDate} size="med" />
                </div>
              </div>
            </div>
          </div>
        )
      },
    )}
  </div>
)

export default PostListView
