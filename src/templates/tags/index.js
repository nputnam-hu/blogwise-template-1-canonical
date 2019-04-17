import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import { upperFirst } from 'lodash'

import Popular from '../../components/Popular'
import Time from '../../components/Time'
import Layout from '../../components/Layout'
import './styles.sass'

class TagView extends Component {
  render() {
    let { posts } = this.props.data.tag
    const { name, description } = this.props.data.tag
    if (!posts) posts = []
    const firstPost = posts.length > 0 ? posts[0] : null
    const otherPosts = posts.slice(1)
    return (
      <Layout>
        <div id="tag-container">
          <Helmet title={name} />
          <span id="tagheader">{`${upperFirst(name)}`}</span>
          <br />
          <span id="tagdescription">{description}</span>
          <hr />
          <div id="tagcontent-container">
            <div id="articles">
              {firstPost ? (
                <>
                  {Boolean(firstPost.thumbnail) && (
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={firstPost.slug}
                    >
                      <Img
                        fluid={firstPost.thumbnail.childImageSharp.largeFluid}
                      />
                    </Link>
                  )}
                  <br />
                  <Link style={{ textDecoration: 'none' }} to={firstPost.slug}>
                    <span className="articletitle">{firstPost.title}</span>
                    <p className="articledescription">
                      {firstPost.excerpt || firstPost.description}
                    </p>
                  </Link>
                  <br />
                  <div>
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={firstPost.author.slug}
                    >
                      <Img
                        className="authorimg first"
                        alt={firstPost.author.name}
                        fixed={firstPost.author.headshot.childImageSharp.fixed}
                      />
                      <div className="articlebyline">
                        {firstPost.author.name}
                      </div>
                    </Link>
                    <div style={{ paddingTop: '3px' }}>
                      <Time date={firstPost.publishDate} size="small" />
                    </div>
                  </div>
                  <hr />
                </>
              ) : (
                <h2 style={{ fontFamily: 'Assistant Regular' }}>
                  No posts tagged {name} yet
                </h2>
              )}
              {otherPosts.map(post => (
                <div key={post.id}>
                  <div className="tagarticle-container">
                    {Boolean(post.thumbnail) && (
                      <React.Fragment>
                        <Link style={{ textDecoration: 'none' }} to={post.slug}>
                          <Img
                            fixed={post.thumbnail.childImageSharp.smallFixed}
                          />
                        </Link>
                        <br />
                      </React.Fragment>
                    )}
                    <div
                      className="tagarticle"
                      style={
                        !post.thumbnail
                          ? { marginLeft: 0, width: '100%', marginTop: 0 }
                          : {}
                      }
                    >
                      <Link style={{ textDecoration: 'none' }} to={post.slug}>
                        <span className="articletitle">{post.title}</span>
                        <p className="articledescription">
                          {post.excerpt || post.description}
                        </p>
                      </Link>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={post.author.slug}
                      >
                        <Img
                          className="authorimg"
                          alt={name}
                          fixed={post.author.headshot.childImageSharp.fixed}
                        />
                      </Link>
                      <div className="articlebyline">{post.author.name}</div>
                      <br />
                      <br />
                      <div>
                        <div className="timewrapper">
                          <Time size="small" date={post.publishDate} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
            <Popular />
          </div>
        </div>
      </Layout>
    )
  }
}

export default TagView

export const pageQuery = graphql`
  query TaqQuery($id: String!) {
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
