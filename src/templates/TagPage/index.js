import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { GlobalStateContext } from '../../components/globalState'
import TagPageContent from '../../components/TagPageContent'
import LatestPosts from '../../components/LatestPosts'

import Layout from '../../components/Layout'
import styles from './styles.module.sass'

class TagPage extends Component {
  render() {
    return (
      <Layout>
        <div className={styles.TagPage}>
          <div className={styles.TagPage__content}>
            <div className={styles.TagPage__title}>
              {this.props.data.tag.name}
            </div>
            <GlobalStateContext.Consumer>
              {globalState => (
                <TagPageContent
                  globalState={globalState}
                  pageContext={this.props.pageContext}
                  allPosts={this.props.data.tag.posts}
                />
              )}
            </GlobalStateContext.Consumer>
          </div>
          <div className={styles.TagPage__latestPosts}>
            <LatestPosts />
          </div>
        </div>
      </Layout>
    )
  }
}

export default TagPage

export const pageQuery = graphql`
  query TagPageQuery($id: String!) {
    tag(id: { eq: $id }) {
      name
      description
      posts {
        id
        excerpt
        description
        slug
        title
        publishDate
        thumbnail {
          childImageSharp {
            largeFluid: fluid(maxWidth: 769, maxHeight: 412) {
              ...GatsbyImageSharpFluid
            }
            smallFixed: fixed(width: 120, height: 90) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        author {
          name
          slug
          headshot {
            childImageSharp {
              fixed(height: 50, width: 50) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
