import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../../components/Layout'
import AuthorList from '../../components/AuthorList'
import Time from '../../components/Time'
import Content, { HTMLContent } from '../../components/Content'
import TagList from '../../components/TagList'
import MorePosts from '../../components/MorePosts'
import styles from './blog-post.module.sass'

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
    const { name, headshot, bio } = author
    const PostContent = contentComponent || Content

    // Construct progress bar
    const Progressbar = (
      <div
        className={styles.BlogPost__progressbar}
        style={{
          width:
            this.state.scrollHeight < 1
              ? `calc(100% * ${this.state.scrollHeight} `
              : 0,
        }}
      />
    )
    return (
      <section id="article-container" className={styles.BlogPost}>
        {Progressbar}
        {helmet || ''}
        {/* Blog Post Info */}
        <div className={styles.BlogPost__title}>{title}</div>
        <div className={styles.BlogPost__authorInfo}>
          <Link style={{ textDecoration: 'none' }} to={author.slug}>
            <Img
              className={styles.authorInfo__image}
              alt={`${author.name} headshot`}
              fixed={author.headshot.childImageSharp.small}
            />
          </Link>
          <div className={styles.authorInfo__text}>
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={author.slug}
            >
              <div className={styles.authorInfo__text__name}>{author.name}</div>
            </Link>
            <Time size="large" date={publishDate} />
          </div>
        </div>
        <PostContent
          className={styles.BlogPost__description}
          content={description}
        />
        {/* Cover Photo */}
        {coverPhoto && (
          <Img fluid={coverPhoto.childImageSharp.fluid} alt="Cover Photo" />
        )}
        {/* Post Content Section */}
        <PostContent
          className={`${styles.BlogPost__content} ${
            styles.bodytext
          } ql-editor `}
          content={htmlBody}
        />
        {/* Tags Section */}
        {tags && tags.length > 0 && (
          <div className={styles.BlogPost__taglistContainer}>
            <TagList tags={tags} />
          </div>
        )}
        {/* Article Footer */}
        <div className={styles.Article__footer}>
          <div className={styles.AuthorPage__header}>
            <div className={styles.AuthorPage__header__imageContainer}>
              <Img
                className={styles.AuthorPage__header__image}
                alt={name}
                fixed={headshot.childImageSharp.large}
              />
            </div>
            {/* <div className={styles.AuthorPage__header__imageContainerMobile}>
              <Img
                className={styles.AuthorPage__header__imageMobile}
                alt={name}
                fixed={headshot.childImageSharp.small}
              />
            </div> */}
            <div className={styles.AuthorPage__header__text}>
              <div className={styles.AuthorPage__header__text__name}>
                {name}
              </div>
              <div className={styles.AuthorPage__header__text__bio}>{bio}</div>
            </div>
          </div>
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
            small: fixed(height: 45, width: 45, quality: 100) {
              ...GatsbyImageSharpFixed
            }
            large: fixed(height: 120, width: 120, quality: 100) {
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
              fixed(width: 200, height: 150, quality: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
