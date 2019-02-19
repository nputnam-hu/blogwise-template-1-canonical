import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import PostListView from '../../components/PostListView'
import { authors } from '../../constants/user.json'
import './styles.sass'

const Author = ({ pageContext, data }) => {
  const { author } = pageContext
  const { name } = authors[author]
  return (
    <Layout>
      <div id="author-container">
        <h1 id="authorheader">Posts from {name}</h1>
        <PostListView
          posts={data.allMarkdownRemark.edges.map(({ node }) => ({
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
}

export default Author

export const pageQuery = graphql`
  query BlogPostsByAuthor($author: String!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { author: { eq: $author } } }
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
