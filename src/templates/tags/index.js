import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import { get, upperFirst, kebabCase } from 'lodash'

import Popular from '../../components/Popular'
import Time from '../../components/Time'
import Layout from '../../components/Layout'
import { tags, authors } from '../../constants/user.json'
import './styles.sass'

class TagView extends Component {
  render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges') || []
    const { tag } = this.props.pageContext
    if (!tags[tag]) return <div>Wrong Page</div>
    const { name, description } = tags[tag]

    const firstPost = posts.length > 0 ? posts[0].node : null
    const otherPosts = posts.slice(1)
    return (
      <Layout>
        <div id="tag-container">
          <Helmet
            title={`${name} | ${this.props.data.site.siteMetadata.title}`}
          />
          <span id="tagheader">{`${upperFirst(name)}`}</span>
          <br />
          <span id="tagdescription">{description}</span>
          <hr />
          <div id="tagcontent-container">
            <div id="articles">
              {firstPost ? (
                <>
                  {Boolean(firstPost.frontmatter.thumbnail) && (
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={firstPost.fields.slug}
                    >
                      <Img
                        fluid={
                          firstPost.frontmatter.thumbnail.childImageSharp
                            .largeFluid
                        }
                      />
                    </Link>
                  )}
                  <br />
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={firstPost.fields.slug}
                  >
                    <span className="articletitle">
                      {firstPost.frontmatter.title}
                    </span>
                    <p className="articledescription">{firstPost.excerpt}</p>
                  </Link>
                  <br />
                  <div>
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={`/authors/${kebabCase(name)}`}
                    >
                      <img
                        className="authorimg first"
                        alt={name}
                        src={authors[firstPost.frontmatter.author].img}
                      />
                      <div className="articlebyline">
                        {authors[firstPost.frontmatter.author].name}
                      </div>
                    </Link>
                    <div style={{ paddingTop: '3px' }}>
                      <Time date={firstPost.frontmatter.date} size="small" />
                    </div>
                  </div>
                  <hr />
                </>
              ) : (
                <h2 style={{ fontFamily: 'Assistant Regular' }}>
                  No posts tagged {name} yet
                </h2>
              )}
              {otherPosts.map(({ node }) => (
                <div key={node.slug}>
                  <div className="tagarticle-container">
                    {Boolean(node.frontmatter.thumbnail) && (
                      <React.Fragment>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={node.fields.slug}
                        >
                          <Img
                            fixed={
                              node.frontmatter.thumbnail.childImageSharp
                                .smallFixed
                            }
                          />
                        </Link>
                        <br />
                      </React.Fragment>
                    )}
                    <div
                      className="tagarticle"
                      style={
                        !node.frontmatter.thumbnail
                          ? { marginLeft: 0, width: '100%', marginTop: 0 }
                          : {}
                      }
                    >
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={node.fields.slug}
                      >
                        <span className="articletitle">
                          {node.frontmatter.title}
                        </span>
                        <p className="articledescription">{node.excerpt}</p>
                      </Link>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/authors/${kebabCase(name)}`}
                      >
                        <img
                          className="authorimg"
                          alt={name}
                          src={authors[node.frontmatter.author].img}
                        />
                      </Link>
                      <div className="articlebyline">
                        {authors[node.frontmatter.author].name}
                      </div>
                      <br />
                      <br />
                      <div>
                        <div className="timewrapper">
                          <Time size="small" date={node.frontmatter.date} />
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
  query TaqQuery($tag: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { eq: $tag } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 140)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            author
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
          }
        }
      }
    }
  }
`
