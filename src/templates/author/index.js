import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import PostListView from '../../components/PostListView'
import './styles.sass'

const Author = ({ data }) => {
  const {
    author: { name, posts },
  } = data
  return (
    <Layout>
      <div id="author-container">
        <h1 className="authorheader">Posts from {name}</h1>
        {posts && posts.length > 0 ? (
          <PostListView posts={posts} />
        ) : (
          <h1 className="authorheader">No posts yet</h1>
        )}
      </div>
    </Layout>
  )
}

export default Author

export const pageQuery = graphql`
  query BlogPostsByAuthor($id: String!) {
    author(id: { eq: $id }) {
      name
      posts {
        id
        excerpt
        description
        slug
        title
        publishDate
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 153, maxHeight: 133, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        author {
          name
          slug
        }
      }
    }
  }
`
