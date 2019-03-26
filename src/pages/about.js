import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import './about.sass'

const About = ({
  data: {
    blogData: { name, description },
    allAuthor: { edges: authors },
  },
}) => (
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

export default About

export const pageQuery = graphql`
  query AboutQuery {
    allAuthor {
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
