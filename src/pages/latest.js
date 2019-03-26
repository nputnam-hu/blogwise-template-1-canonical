import React from 'react'
import { graphql } from 'gatsby'

import PostListView from '../components/PostListView'
import Layout from '../components/Layout'
import '../templates/author/styles.sass'

const Latest = ({
  data: {
    allBlogPost: { edges: posts },
  },
}) => (
  <Layout>
    <div id="author-container">
      <h1 id="authorheader">Latest Posts</h1>
      <PostListView posts={posts.map(p => p.node)} />
    </div>
  </Layout>
)

export default Latest

export const pageQuery = graphql`
  query LatestQuery {
    allBlogPost(sort: { order: DESC, fields: [publishDate] }) {
      edges {
        node {
          id
          description
          excerpt
          slug
          title
          publishDate
          author {
            name
            slug
          }
          thumbnail: coverPhoto {
            childImageSharp {
              fluid(maxWidth: 153, maxHeight: 133) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
