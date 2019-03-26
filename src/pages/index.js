import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import IndexContent from '../components/IndexContent'
import { hasBeenInitialized } from '../constants/user.json'

export default class IndexPage extends Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allBlogPost
    const { edges: tags } = data.allTag

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
  query IndexQuery {
    allBlogPost(
      sort: { order: DESC, fields: [publishDate] }
      limit: 5
      filter: {
        id: { ne: "blogwise-post-3b8cba55-b05d-43fc-bfa6-a51c4aea3d61" }
      }
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
    allTag(
      filter: {
        id: { ne: "blogwise-tag-51e8f9eb-1617-4f18-a1f8-d48175e79ae0" }
      }
    ) {
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
      twitterUrl
      facebookUrl
      linkedinUrl
      header {
        childImageSharp {
          fixed(height: 75) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      sidebar {
        childImageSharp {
          fixed(height: 35) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      background {
        childImageSharp {
          fluid(maxHeight: 35) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
