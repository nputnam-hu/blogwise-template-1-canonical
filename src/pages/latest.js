import React from 'react'
import { graphql } from 'gatsby'

import PostListView from '../components/PostListView'
import Layout from '../components/Layout'
import { authors } from '../constants/user.json'
import '../templates/author/styles.sass'

const Latest = ({
  data: {
    allMarkdownRemark: { edges: posts },
  },
}) => (
  <Layout>
    <div id="author-container">
      <h1 id="authorheader">Latest Posts</h1>
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
  </Layout>
)

export default Latest

export const pageQuery = graphql`
  query LatestQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 140)
          id
          fields {
            slug
          }
          frontmatter {
            title
            author
            templateKey
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 153, maxHeight: 133) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
