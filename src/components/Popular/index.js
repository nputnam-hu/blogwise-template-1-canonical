import React from 'react'
import get from 'lodash/get'
import Link from 'gatsby-link'
import { StaticQuery, graphql } from 'gatsby'

import Time from '../Time'
import './styles.sass'
import { authors } from '../../constants/user.json'

const Popular = () => (
  <StaticQuery
    query={graphql`
      query LatestArticles {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          limit: 3
        ) {
          edges {
            node {
              excerpt
              fields {
                slug
              }
              frontmatter {
                date(formatString: "DD MMMM, YYYY")
                title
                author
              }
            }
          }
        }
      }
    `}
    render={({ allMarkdownRemark: { edges: posts } }) => (
      <div id="popular-container">
        <span id="header-text">Latest Posts</span>
        <div className="linebreak" />
        {posts.map(({ node }, i) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          const { name = '' } = authors[get(node, 'frontmatter.author')] || {}
          return (
            <div className="popular-article" key={node.fields.slug}>
              <span className="numbertext">{`0${i + 1}`}</span>
              <div className="content">
                <Link className="article-link" to={node.fields.slug}>
                  <b>{title}</b>
                </Link>
                <br />
                <div className="author-name">{name}</div>
                <Time date={node.frontmatter.date} />
              </div>
            </div>
          )
        })}
      </div>
    )}
  />
)

export default Popular
