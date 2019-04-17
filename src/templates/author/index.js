import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import PostList from '../../components/PostList'
import styles from './styles.module.sass'

const Author = ({ data }) => {
  const {
    author: { name, posts, bio },
  } = data

  const AuthorInfo = (
    <div className={styles.AuthorInfo}>
      <div className={styles.AuthorInfo__image}>Image</div>
      <div className={styles.AuthorInfo__text}>
        <div className={styles.AuthorInfo__text__name}>{name}</div>
        <div className={styles.AuthorInfo__text__bio}>{bio}</div>
      </div>
    </div>
  )
  return (
    <Layout>
      <div className={styles.Author}>
        {AuthorInfo}
        {posts && posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <div className={styles.Author__noPosts}>No posts yet</div>
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
          bio
          slug
        }
      }
    }
  }
`
