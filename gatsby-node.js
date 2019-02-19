const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const fs = require('fs')

const { authors, tags: currentTags } = require('./src/constants/user.json')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  Object.keys(authors).forEach(author => {
    createPage({
      path: `/authors/${_.kebabCase(authors[author].name)}`,
      component: path.resolve(`src/templates/author/index.js`),
      // additional data can be passed via context
      context: {
        author,
      },
    })
  })
  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges
    posts.forEach(edge => {
      const { id } = edge.node
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}/index.js`,
        ),
        // additional data can be passed via context
        context: {
          id,
          tags: edge.node.frontmatter.tags,
        },
      })
    })

    // Tag pages:
    let tags = Object.values(currentTags).map(tag => tag.name)
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/${_.kebabCase(
        currentTags[tag] ? currentTags[tag].name : tag,
      )}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags/index.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// Build search index
exports.onPostBootstrap = ({ getNodes }) => {
  const nodes = getNodes().filter(
    n =>
      n.internal.type === 'MarkdownRemark' &&
      n.frontmatter.templateKey === 'blog-post',
  )
  const docs = nodes.map(node => ({
    id: node.id,
    title: node.frontmatter.title,
    author: authors[node.frontmatter.author],
    description: node.frontmatter.description,
    date: node.frontmatter.date,
    tags: node.frontmatter.tags,
    thumbnail: node.frontmatter.thumbnail
      ? node.frontmatter.thumbnail.match(/\/img.*/g)[0]
      : null,
    slug: node.fields.slug,
  }))
  fs.writeFileSync('./public/search_index.json', JSON.stringify({ docs }))
}
