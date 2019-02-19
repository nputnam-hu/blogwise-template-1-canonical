import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import IndexContent from '../components/IndexContent'

export default class IndexPage extends Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout showNav={false}>
        <IndexContent posts={posts} />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: 5
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
