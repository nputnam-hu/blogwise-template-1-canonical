import React, { Component } from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'

import Layout from '../../components/Layout'
import Time from '../../components/Time'
import Content, { HTMLContent } from '../../components/Content'
import MorePosts from '../../components/MorePosts'
import { authors, siteUrl, tags as userTags } from '../../constants/user.json'
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
      content,
      contentComponent,
      helmet,
      slug = '',
      description = '',
      tags = [],
      title = '',
      date = Date.now(),
      author = {},
      morePosts = [],
    } = this.props
    const PostContent = contentComponent || Content
    const { name = '', img = '', bio = '' } = author
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
        <Link
          style={{ textDecoration: 'none' }}
          to={`/authors/${kebabCase(name)}`}
        >
          <img className="authorimg" alt={name} src={img} />
        </Link>
        <div className="authorinfo">
          <Link
            style={{ textDecoration: 'none' }}
            to={`/authors/${kebabCase(name)}`}
          >
            <div className="article-authorname">{name}</div>
          </Link>
          <Time size="large" date={date} />
        </div>
        <i>
          <PostContent className="bodytext" content={description} />
        </i>
        <PostContent className="bodytext" content={content} />
        {tags && tags.length > 0 ? (
          <div style={{ marginTop: `3rem` }}>
            <ul className="taglist">
              {tags.map(tag => (
                <li key={`${tag}tag`}>
                  <Link
                    to={kebabCase(userTags[tag] ? userTags[tag].name : tag)}
                  >
                    {userTags[tag].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div id="articlebottomcontent">
          <div>
            <Link
              style={{ textDecoration: 'none' }}
              to={`/authors/${kebabCase(name)}`}
            >
              <img className="authorimg" alt={name} src={img} />
            </Link>
            <div className="authorinfo">
              <Link
                style={{ textDecoration: 'none' }}
                to={`/authors/${kebabCase(name)}`}
              >
                <div className="article-authorname">{name}</div>
              </Link>
              <div className="article-authorbio">{bio}</div>
            </div>
          </div>
          <div className="sharebuttons">
            <FacebookShareButton
              url={`${siteUrl}${slug}`}
              quote={title}
              className="Demo__some-network__share-button"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={`${siteUrl}${slug}`}
              title={title}
              className="Demo__some-network__share-button"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <EmailShareButton
              url={`${siteUrl}${slug}`}
              subject={title}
              className="Demo__some-network__share-button"
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
            <LinkedinShareButton
              url={`${siteUrl}${slug}`}
              title={title}
              className="Demo__some-network__share-button"
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>
        </div>
        <hr />
        <MorePosts posts={morePosts} />
      </section>
    )
  }
}
const BlogPost = ({ data }) => {
  const {
    markdownRemark: post,
    allMarkdownRemark: { edges: morePosts },
  } = data
  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
            <meta property="og:title" content={post.frontmatter.title} />
            {post.frontmatter.thumbnail && (
              <meta
                property="og:image"
                content={post.frontmatter.thumbnail.absolutePath}
              />
            )}
          </Helmet>
        }
        tags={post.frontmatter.tags}
        slug={post.fields.slug}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        author={authors[post.frontmatter.author]}
        morePosts={morePosts}
      />
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!, $tags: [String!]!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        thumbnail {
          absolutePath
        }
        tags
        author
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: $tags } }, id: { ne: $id } }
      limit: 3
    ) {
      edges {
        node {
          excerpt(pruneLength: 80)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            author
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
  }
`
