import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import { GlobalStateContext } from '../../components/globalState'
import AuthorPageContent from '../../components/AuthorPageContent'

import Layout from '../../components/Layout'
import styles from './styles.module.sass'

class AuthorPage extends Component {
  render() {
    const { name, headshot, bio, posts } = this.props.data.author
    const { pageContext } = this.props
    return (
      <Layout>
        <div className={styles.AuthorPage}>
          <div className={styles.AuthorPage__content}>
            <div className={styles.AuthorPage__header}>
              <div className={styles.AuthorPage__header__imageContainer}>
                <Img
                  className={styles.AuthorPage__header__image}
                  alt={name}
                  fixed={headshot.childImageSharp.large}
                />
              </div>
              <div className={styles.AuthorPage__header__imageContainerMobile}>
                <Img
                  className={styles.AuthorPage__header__imageMobile}
                  alt={name}
                  fixed={headshot.childImageSharp.small}
                />
              </div>
              <div className={styles.AuthorPage__header__text}>
                <div className={styles.AuthorPage__header__text__name}>
                  {name}
                </div>
                <div className={styles.AuthorPage__header__text__bio}>
                  {bio}
                </div>
              </div>
            </div>
            <hr className={styles.AuthorPage__lineBreak} />
            <div className={styles.AuthorPage__postsContainer}>
              <GlobalStateContext.Consumer>
                {globalState => (
                  <AuthorPageContent
                    globalState={globalState}
                    pageContext={pageContext}
                    allPosts={posts}
                  />
                )}
              </GlobalStateContext.Consumer>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default AuthorPage

export const pageQuery = graphql`
  query AuthorPageQuery($id: String!) {
    author(id: { eq: $id }) {
      name
      bio
      headshot {
        childImageSharp {
          small: fixed(height: 130, width: 130, quality: 100) {
            ...GatsbyImageSharpFixed
          }
          large: fixed(height: 200, width: 200, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
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
