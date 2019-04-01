import React from 'react'
import get from 'lodash/get'
import Link from 'gatsby-link'
import { StaticQuery, graphql } from 'gatsby'
import Time from '../Time'
import './styles.sass'

const Popular = () => (
  <StaticQuery
    // Figure out how to insert schema post id with variable.
    query={graphql`
      query LatestArticles {
        allBlogPost(
          sort: { fields: [publishDate], order: DESC }
          limit: 3
          filter: {
            id: { ne: "blogwise-post-bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb" }
          }
        ) {
          edges {
            node {
              publishDate
              slug
              title
              author {
                name
              }
            }
          }
        }
      }
    `}
    render={({ allBlogPost }) => (
      <div id="popular-container">
        <span id="header-text">Latest Posts</span>
        <div className="linebreak" />
        {(console.log(allBlogPost, allBlogPost.edges) || allBlogPost
          ? allBlogPost.edges.posts
          : []
        ).map(({ node }, i) => {
          const { title, publishDate, slug, author } = node
          return (
            <div className="popular-article" key={slug}>
              <span className="numbertext">{`0${i + 1}`}</span>
              <div className="content">
                <Link className="article-link" to={slug}>
                  {title}
                </Link>
                <br />
                <div className="author-name">{author.name}</div>
                <Time date={publishDate} />
              </div>
            </div>
          )
        })}
      </div>
    )}
  />
)

export default Popular
