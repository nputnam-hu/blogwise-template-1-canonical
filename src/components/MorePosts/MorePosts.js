import React from 'react'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import './styles.sass'

const MorePosts = ({ posts }) => (
  <div>
    <h3 id="morepostsheader">More Like This Post</h3>
    <div id="moreposts-container">
      {posts.map(({ slug, title, description, thumbnail }) => (
        <div className="morebox">
          <Link to={slug}>
            {thumbnail ? (
              <Img alt={title} fixed={thumbnail.childImageSharp.fixed} />
            ) : (
              <div style={{ height: 150, width: 200 }} />
            )}
            <div className="moretitle"> {title}</div>
            <div className="moreexcerpt"> {description}</div>
          </Link>
        </div>
      ))}
    </div>
  </div>
)

export default MorePosts
