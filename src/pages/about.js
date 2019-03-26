import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import '../styles/about.sass'

const About = ({
  data: {
    blogData: { name, description },
    allAuthor,
  },
}) => {
  let AboutContents = (
    <Layout>
      <div className="about-container">
        <h1 id="authorheader">About {name}</h1>
        <div className="body-text">{description}</div>
        <div style={{ height: '50px' }} />
      </div>
    </Layout>
  )

  if (allAuthor !== null) {
    const { edges: authors } = allAuthor
    AboutContents = (
      <Layout>
        <div className="about-container">
          <h1 id="authorheader">About {name}</h1>
          <div className="body-text">{description}</div>
          <div style={{ height: '50px' }} />
          <div className="writers">
            <h2>Writers</h2>
            {authors.map(({ node }) => (
              <Link key={node.id} className="writers__entry" to={node.slug}>
                <Img
                  alt={`${node.name} headshot`}
                  fixed={node.headshot.childImageSharp.fixed}
                  className="writers__headshot"
                />
                <div style={{ width: '30px' }} />
                <div className="writers__text">
                  <span className="writers__name">{node.name}</span>
                  <p className="writers__bio">{node.bio}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    )
  }
  return AboutContents
}

export default About

export const pageQuery = graphql`
  query AboutQuery {
    allAuthor(
      filter: {
        id: { ne: "blogwise-author-fcae3044-6a1e-4c20-909a-aa41d09bc001" }
      }
    ) {
      edges {
        node {
          id
          name
          bio
          slug
          headshot {
            childImageSharp {
              fixed(height: 70, width: 70) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
    blogData {
      name
      description
    }
  }
`
