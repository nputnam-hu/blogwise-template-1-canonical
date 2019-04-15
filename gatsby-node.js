/* eslint-disable consistent-return */
const path = require('path')
const fs = require('fs')
const schemaData = require('./plugins/gatsby-source-blogwise/schema.json')

// Extract the id values for the schemas
const { schemaAuthor, schemaPost, schemaTag } = schemaData
const schemaAuthorId = `blogwise-author-${schemaAuthor[0].id}`
const schemaPostId = `blogwise-post-${schemaPost[0].id}`
const schemaTagId = `blogwise-tag-${Object.keys(schemaTag)[0]}`

const { hasBeenInitialized } = require('./config.json')

exports.createPages = ({ actions, graphql }) => {
  if (!hasBeenInitialized) {
    return
  }
  const { createPage } = actions
  // TODO: Figure out how to use variables for ids here
  return graphql(`
    {
      allBlogPost(
        limit: 1000
        filter: {
          id: { ne: "blogwise-post-bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb" }
        }
      ) {
        edges {
          node {
            id
            title
            description
            htmlBody
            publishDate
            author {
              id
              name
              slug
            }
            thumbnail {
              id
              childImageSharp {
                id
                fixed {
                  src
                }
                fluid {
                  src
                  aspectRatio
                }
              }
            }
            coverPhoto {
              id
            }
            slug
            tags {
              id
            }
          }
        }
      }
      allAuthor(
        filter: {
          id: { ne: "blogwise-author-aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" }
        }
      ) {
        edges {
          node {
            id
            slug
          }
        }
      }
      allTag(
        filter: {
          id: { ne: "blogwise-tag-cccccccc-cccc-cccc-cccc-cccccccccccc" }
        }
      ) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }
    let posts = []
    if (result.data.allBlogPost !== null) {
      posts = result.data.allBlogPost.edges
    }
    posts.forEach(({ node }) => {
      const { slug, id, tags } = node
      createPage({
        path: slug,
        component: path.resolve(`src/templates/blog-post/index.js`),
        // additional data can be passed via context
        context: {
          id,
          tagIds: tags.map(t => t.id),
        },
      })
    })
    const authors = result.data.allAuthor.edges
    authors.forEach(({ node }) => {
      const { slug, id } = node
      createPage({
        path: slug,
        component: path.resolve(`src/templates/author/index.js`),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })
    let tags = {}
    if (result.data.allTag !== null) {
      tags = result.data.allTag.edges

      tags.forEach(({ node }) => {
        const { slug, id } = node

        const paginatedTagPageTemplate = path.resolve(
          'src/templates/TagPage/index.js',
        )

        const pageData = {
          path: `${slug}`,
          component: paginatedTagPageTemplate,
          context: {
            slug,
            id,
          },
        }
        createPage(pageData)
      })
    }
  })
}

// Pass the schema values in the context
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  deletePage(page)
  // You can access the variable "house" in your page queries now
  createPage({
    ...page,
    context: {
      schemaAuthorId,
      schemaPostId,
      schemaTagId,
    },
  })
}

// Build search index
exports.onPostBootstrap = ({ getNodes }) => {
  if (!hasBeenInitialized) {
    return
  }
  const nodes = getNodes().filter(n => n.internal.type === 'BlogPost')
  const docs = nodes.map(node => ({
    id: node.id,
    title: node.title,
    slug: node.slug,
    author: node.author___NODE,
    excerpt: node.excerpt,
    publishDate: node.publishDate,
    tags: node.tags___NODE,
  }))
  fs.writeFileSync('./public/search_index.json', JSON.stringify({ docs }))
}
