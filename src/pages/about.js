import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'

import styles from '../styles/about.module.sass'

const About = ({ data: { blogData, allAuthor } }) => {
  let AboutBlog = (
    <div className={styles.About__blogInfo}>
      <div className={styles.About__blogInfo__title}>About</div>
    </div>
  )
  let AboutWriters = <div />

  if (blogData !== null) {
    const { name, description } = blogData
    AboutBlog = (
      <div className={styles.About__blogInfo}>
        <div className={styles.About__blogInfo__title}>About {name}</div>
        <div className={styles.About__blogInfo__body}>{description}</div>
      </div>
    )
  }

  if (allAuthor !== null) {
    const { edges: authors } = allAuthor
    AboutWriters = (
      <div className={styles.About__writers}>
        <div className={styles.About__writers__title}>Writers</div>
        <div className={styles.About__writers__list}>
          {authors.map(({ node }) => (
            <Link key={node.id} className={styles.writer} to={node.slug}>
              <div className={styles.writer__headshot}>
                <Img
                  alt={`${node.name} headshot`}
                  fixed={node.headshot.childImageSharp.fixed}
                />
              </div>
              <div className={styles.writer__text}>
                <div className={styles.writer__text__name}>{node.name}</div>
                <div className={styles.writer__text__bio}>{node.bio}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className={styles.About}>
        {AboutBlog}
        {AboutWriters}
      </div>
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query AboutQuery($schemaAuthorId: String) {
    allAuthor(filter: { id: { ne: $schemaAuthorId } }) {
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
