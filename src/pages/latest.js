import React from 'react'
import { graphql } from 'gatsby'

import PostList from '../components/PostList'
import Layout from '../components/Layout'
import styles from '../styles/latest.module.sass'

const Latest = ({ data: { allBlogPost } }) => {
  console.log(allBlogPost.edges.posts)
  const LatestContents =
    allBlogPost === null ? (
      <div>Sorry, no posts yet! Come back soon.</div>
    ) : (
      <PostList posts={allBlogPost.edges.map(ele => ele.node)} />
    )

  return (
    <Layout>
      <div className={styles.Latest}>
        <div className={styles.Latest__title}>Latest Posts</div>
        {LatestContents}
      </div>
    </Layout>
  )
}
export default Latest

export const pageQuery = graphql`
  query LatestQuery($schemaPostId: String) {
    allBlogPost(
      sort: { order: DESC, fields: [publishDate] }
      filter: { id: { ne: $schemaPostId } }
    ) {
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
            headshot {
              childImageSharp {
                small: fluid(quality: 100) {
                  ...GatsbyImageSharpFluid
                }
                large: fixed(height: 120, width: 120, quality: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
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
        }
      }
    }
  }
`
