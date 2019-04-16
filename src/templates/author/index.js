import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import PostList from '../../components/PostList'
import styles from author.module.sass
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
          <PostList posts={posts} />
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
            largeFluid: fluid(maxWidth: 769, maxHeight: 412, quality: 100) {
              ...GatsbyImageSharpFluid
            }
            smallFixed: fixed(width: 120, height: 90, quality: 100) {
              ...GatsbyImageSharpFixed
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
