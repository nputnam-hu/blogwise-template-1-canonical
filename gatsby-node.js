/* eslint-disable consistent-return */
const path = require('path')
const fs = require('fs')
const schemaData = require('./plugins/gatsby-source-blogwise/schema.json')

const { schemaAuthor, schemaPost, schemaTag } = schemaData
const schemaTagId = `blogwise-tag-${Object.keys(schemaTag)[0]}`
const { hasBeenInitialized } = require('./src/constants/user.json')

exports.createPages = ({ actions, graphql }) => {
  if (!hasBeenInitialized) {
    return
  }
  const { createPage } = actions
  return graphql(`
    {
      allBlogPost(limit: 1000) {
        edges {
          node {
            id
            slug
            tags {
              id
            }
          }
        }
      }
      allAuthor {
        edges {
          node {
            id
            slug
          }
        }
      }
      allTag {
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

    const posts = result.data.allBlogPost.edges
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
    const tags = result.data.allTag.edges
    tags.forEach(({ node }) => {
      const { slug, id } = node

      createPage({
        path: slug,
        component: path.resolve(`src/templates/tags/index.js`),
        context: {
          id,
        },
      })
    })
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
