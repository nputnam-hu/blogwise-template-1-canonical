import React from 'react'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import './styles.sass'

const MorePosts = ({ posts }) => (
  <div>
    <h3 id="morepostsheader">More Like This Post</h3>
    <div id="moreposts-container">
      {posts.map(({ node }) => (
        <div className="morebox">
          <Link to={node.fields.slug}>
            {node.frontmatter.thumbnail ? (
              <Img
                alt={node.frontmatter.title}
                fixed={node.frontmatter.thumbnail.childImageSharp.fixed}
              />
            ) : (
              <div style={{ height: 150, width: 200 }} />
            )}
            <div className="moretitle"> {node.frontmatter.title}</div>
            <div className="moreexcerpt"> {node.excerpt}</div>
          </Link>
        </div>
      ))}
    </div>
  </div>
)

export default MorePosts
