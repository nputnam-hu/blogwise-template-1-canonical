import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'

import EmailIcon from '../../../static/social-icons/email-icon.svg'
import FacebookIcon from '../../../static/social-icons/facebook-icon.svg'
import LinkedinIcon from '../../../static/social-icons/linkedin-icon.svg'
import TwitterIcon from '../../../static/social-icons/twitter-icon.svg'

import Layout from '../../components/Layout'
import Time from '../../components/Time'
import Content, { HTMLContent } from '../../components/Content'
import TagList from '../../components/TagList'
import MorePosts from '../../components/MorePosts'
import styles from './blog-post.module.sass'

export class BlogPostTemplate extends Component {
  state = {
    scrollHeight: 0,
    pageUrl: '',
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ pageUrl: window.location.href })
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
    const { pageUrl } = this.state

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
        <div
          className={`${styles.AuthorPage__sharebuttons} ${
            this.state.scrollHeight < 1
              ? ' '
              : styles.AuthorPage__sharebuttonsFixed
          }`}
        >
          <FacebookShareButton url={pageUrl} quote={title}>
            <img src={FacebookIcon} />
          </FacebookShareButton>
          <TwitterShareButton url={pageUrl} title={title}>
            <img src={TwitterIcon} />
          </TwitterShareButton>
          <EmailShareButton url={pageUrl} subject={title}>
            <img src={EmailIcon} />
          </EmailShareButton>
          <LinkedinShareButton url={pageUrl} title={title}>
            <img src={LinkedinIcon} />
          </LinkedinShareButton>
        </div>
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
            <Time large date={publishDate} />
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
          <Link style={{ textDecoration: 'none' }} to={author.slug}>
            <div className={styles.AuthorPage__header}>
              <div className={styles.AuthorPage__header__imageContainer}>
                <Img
                  className={styles.AuthorPage__header__image}
                  alt={name}
                  fixed={headshot.childImageSharp.large}
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
          </Link>
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
  const thumbnailExists = Boolean(post.thumbnail)
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
                content={thumbnailExists && post.thumbnail.url}
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
        url
        childImageSharp {
          fluid(maxWidth: 450, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      thumbnail {
        url
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
      limit: 2
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
              fixed(width: 340, height: 175, quality: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
