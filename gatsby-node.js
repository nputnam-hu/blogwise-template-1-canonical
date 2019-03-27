/* eslint-disable consistent-return */
const path = require('path')
const fs = require('fs')
const schemaData = require('./plugins/gatsby-source-blogwise/schema.json')

// Extract the id values for the schemas
const { schemaAuthor, schemaPost, schemaTag } = schemaData
const schemaAuthorId = `blogwise-author-${schemaAuthor[0].id}`
const schemaPostId = `blogwise-post-${schemaPost[0].id}`
const schemaTagId = `blogwise-tag-${Object.keys(schemaTag)[0]}`

const { hasBeenInitialized } = require('./src/constants/user.json')

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
          id: { ne: "blogwise-post-3b8cba55-b05d-43fc-bfa6-a51c4aea3d61" }
        }
      ) {
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
      allAuthor(
        filter: {
          id: { ne: "blogwise-author-fcae3044-6a1e-4c20-909a-aa41d09bc001" }
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
          id: { ne: "blogwise-tag-51e8f9eb-1617-4f18-a1f8-d48175e79ae0" }
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
