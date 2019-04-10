import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { GlobalStateContext } from '../../components/globalState'
import TagView from '../../components/tagView'

import Layout from '../../components/Layout'
import './styles.sass'

class TagTestView extends Component {
  render() {
    return (
      <Layout>
        <GlobalStateContext.Consumer>
          {globalState => (
            <TagView
              globalState={globalState}
              pageContext={this.props.pageContext}
            />
          )}
        </GlobalStateContext.Consumer>
      </Layout>
    )
  }
}

export default TagTestView

export const pageQuery = graphql`
  query TaqTestQuery($id: String!) {
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
            smallFixed: fixed(width: 373, height: 281) {
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
