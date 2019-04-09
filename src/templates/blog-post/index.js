import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../../components/Layout'
import AuthorList from '../../components/AuthorList'
import Time from '../../components/Time'
import Content, { HTMLContent } from '../../components/Content'
import MorePosts from '../../components/MorePosts'
import styles from './blog-post.module.sass'
import './styles.sass'

export class BlogPostTemplate extends Component {
  state = {
    scrollHeight: 0,
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll = () => {
    this.setState({
      scrollHeight:
        window.scrollY /
        (document.getElementById('article-container').scrollHeight -
          window.innerHeight),
    })
  }
  render() {
    const {
      htmlBody,
      contentComponent,
      helmet,
      coverPhoto,
      description,
      tags = [],
      title,
      publishDate,
      author,
      morePosts = [],
    } = this.props
    const PostContent = contentComponent || Content

    return (
      <section id="article-container">
        <div
          id="progressbar"
          style={{
            width:
              this.state.scrollHeight < 1
                ? `calc(100% * ${this.state.scrollHeight} `
                : 0,
          }}
        />
        {helmet || ''}
        <h1 id="article-title">{title}</h1>
        <Link style={{ textDecoration: 'none' }} to={author.slug}>
          <Img
            className="authorimg"
            alt={`${author.name} headshot`}
            fixed={author.headshot.childImageSharp.fixed}
          />
        </Link>
        <div className="authorinfo">
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to={author.slug}
          >
            <div className="article-authorname">{author.name}</div>
          </Link>
          <Time size="large" date={publishDate} />
        </div>
        <i>
          <PostContent className="bodytext" content={description} />
        </i>
        {coverPhoto && (
          <Img
            fluid={coverPhoto.childImageSharp.fluid}
            alt="Cover Photo"
            className="article-cover"
          />
        )}
        <PostContent
          className="bodytext ql-editor mainbody"
          content={htmlBody}
        />
        {tags && tags.length > 0 && (
          <div style={{ marginTop: `3rem` }}>
            <ul className="taglist">
              {tags.map(tag => (
                <li key={`${tag.id}tag`}>
                  <Link to={tag.slug}>{tag.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Article Footer */}
        <div className={styles.Article__footer}>
          <AuthorList author={author} />
        </div>
        <hr />
        {morePosts && morePosts.length > 0 && <MorePosts posts={morePosts} />}
      </section>
    )
  }
}
const BlogPost = ({ data }) => {
  const { blogPost: post } = data
  const morePosts = data.allBlogPost
    ? data.allBlogPost.edges.map(p => p.node)
    : []
  return (
    <Layout>
      <BlogPostTemplate
        htmlBody={post.htmlBody}
        contentComponent={HTMLContent}
        description={post.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.title}`}</title>
            <meta name="description" content={`${post.description}`} />
            <meta property="og:title" content={post.title} />
            {post.coverPhoto && (
              <meta
                property="og:image"
                content={post.coverPhoto.relativePath}
              />
            )}
          </Helmet>
        }
        coverPhoto={post.coverPhoto}
        tags={post.tags}
        title={post.title}
        publishDate={post.publishDate}
        author={post.author}
        morePosts={morePosts}
      />
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!, $tagIds: [String!]) {
    blogPost(id: { eq: $id }) {
      id
      htmlBody
      slug
      publishDate
      title
      description
      coverPhoto {
        absolutePath
        childImageSharp {
          fluid(maxWidth: 450, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      tags {
        id
        slug
        name
      }
      author {
        name
        bio
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
    allBlogPost(
      sort: { fields: [publishDate], order: DESC }
      filter: { id: { ne: $id }, tags: { elemMatch: { id: { in: $tagIds } } } }
      limit: 3
    ) {
      edges {
        node {
          description
          excerpt
          publishDate
          title
          slug
          author {
            slug
            name
          }
          thumbnail {
            childImageSharp {
              fixed(width: 200, height: 150) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
