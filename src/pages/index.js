import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import IndexContent from '../components/IndexContent'

const { hasBeenInitialized } = require('../../config.json')

export default class IndexPage extends Component {
  render() {
    const { data } = this.props
    let posts = []
    let tags = {}

    if (data.allBlogPost !== null) {
      posts = data.allBlogPost.edges // eslint-disable-line
    }

    if (data.allTag !== null) {
      tags = data.allTag.edges // eslint-disable-line
    }

    return hasBeenInitialized ? (
      <Layout showNav={false}>
        <IndexContent posts={posts} tags={tags} blogData={data.blogData} />
      </Layout>
    ) : (
      <div
        style={{
          paddingTop: '60px',
          width: '100vw',
          textAlign: 'center',
          fontSize: '16px',
          fontFamily: 'futura-pt, sans-serif',
        }}
      >
        <img
          src="https://s3.amazonaws.com/megaphone-logo-uploads/logo-yellow.png"
          style={{ height: '60px' }}
          alt="Blogwise"
        />
        <br />
        <img
          src="https://surveyo24.com/css/loader.gif"
          alt="Loading"
          style={{ height: '60px' }}
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
  query IndexQuery($schemaPostId: String, $schemaTagId: String) {
    allBlogPost(
      sort: { order: DESC, fields: [publishDate] }
      limit: 5
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
    allTag(filter: { id: { ne: $schemaTagId } }) {
      edges {
        node {
          name
          slug
        }
      }
    }
    blogData {
      title
      name
      description
      backgroundHexCode
      navbarHexCode
      headerTextColor
      twitterUrl
      facebookUrl
      linkedinUrl
      header {
        childImageSharp {
          fixed(height: 75, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      sidebar {
        childImageSharp {
          fixed(height: 35, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      background {
        childImageSharp {
          fluid(maxHeight: 35, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
