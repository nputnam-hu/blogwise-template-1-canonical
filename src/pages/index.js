import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import IndexContent from '../components/IndexContent'
import { hasBeenInitialized } from '../constants/user.json'

export default class IndexPage extends Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return hasBeenInitialized ? (
      <Layout showNav={false}>
        <IndexContent posts={posts} />
      </Layout>
    ) : (
      <div
        style={{
          paddingTop: '60px',
          width: '100vw',
          textAlign: 'center',
          fontSize: '16px',
          fontFamily: 'Roboto',
        }}
      >
        <img
          src="https://app.blogwise.co/static/media/logo.243ba0ff.png"
          style={{ height: '60px' }}
          alt="Blogwise"
        />
        <p>
          Your blog is in the process of being deployed, check back in a couple
          minutes
        </p>
      </div>
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
