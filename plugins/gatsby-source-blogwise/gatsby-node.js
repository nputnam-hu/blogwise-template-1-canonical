const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { kebabCase } = require('lodash')
const truncate = require('truncatise')
const decode = require('unescape')
const rp = require('request-promise')

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, store, cache },
  { token, apiUrl },
) => {
  const { createNode } = actions
  if (!token) {
    throw new Error('Must provide a valid JWT token')
  }
  if (!apiUrl) {
    throw new Error('Must provide a valid API url')
  }
  const blogData = await rp({
    method: 'GET',
    uri: `${apiUrl}/blogs/build`,
    headers: {
      'x-access-token': token,
    },
    json: true,
  })
  const { posts, tags, authors, data } = blogData

  const createPostId = id => `blogwise-post-${id}`
  const createAuthorId = id => `blogwise-author-${id}`
  const createTagId = id => `blogwise-tag-${id}`

  const truncateOptions = {
    TruncateLength: 140,
    TruncateBy: 'characters',
    Strict: false,
    StripHTML: true,
    Suffix: '...',
  }

  // objects to store the posts associated with each author and tag
  const authorPosts = {}
  const tagPosts = {}
  const postData = await Promise.all(
    posts.map(async post => {
      const postNodeId = createPostId(post.id)
      const postAuthorNodeId = createAuthorId(post.authorId)
      const postTagsNodeIds = post.tagIds.map(createTagId)
      const fields = {
        title: post.title,
        description: post.description || '',
        htmlBody: post.htmlBody,
        excerpt: decode(truncate(post.htmlBody, truncateOptions)),
        publishDate: post.publishDate,
        slug: post.slug,
        author___NODE: createAuthorId(post.authorId),
        tags___NODE: postTagsNodeIds,
      }
      authorPosts[postAuthorNodeId] = [
        ...(authorPosts[postAuthorNodeId] || []),
        postNodeId,
      ]
      postTagsNodeIds.forEach(id => {
        tagPosts[id] = [...(tagPosts[id] || []), postNodeId]
      })
      const postNodeData = {
        ...fields,
        // gatsby required options
        id: postNodeId,
        parent: null,
        children: [],
        internal: {
          type: `BlogPost`,
          content: JSON.stringify(fields),
          contentDigest: createContentDigest(post),
        },
      }
      if (post.coverPhotoUri) {
        const coverPhotoNode = await createRemoteFileNode({
          url: post.coverPhotoUri,
          parentNodeId: postNodeId,
          store,
          cache,
          createNode,
          createNodeId,
          ext: `.${post.coverPhotoUri.split('.').pop()}`,
        })
        if (coverPhotoNode) {
          postNodeData.coverPhoto___NODE = coverPhotoNode.id
        }
      }
      return postNodeData
    }),
  )
  const authorData = await Promise.all(
    authors.map(async author => {
      const authorNodeId = createAuthorId(author.id)
      const fields = {
        name: author.name,
        bio: author.bio || '',
        slug: `/authors/${kebabCase(author.name)}`,
        posts___NODE: authorPosts[authorNodeId],
      }
      const authorNodeData = {
        // fields data
        ...fields,
        // gatsby required options
        id: authorNodeId,
        parent: null,
        children: [],
        internal: {
          type: `Author`,
          content: JSON.stringify(fields),
          contentDigest: createContentDigest(author),
        },
      }
      const headshotNode = await createRemoteFileNode({
        url: author.headshotUri,
        parentNodeId: authorNodeId,
        store,
        cache,
        createNode,
        createNodeId,
        ext: `.${author.headshotUri.split('.').pop()}`,
      })
      if (headshotNode) {
        authorNodeData.headshot___NODE = headshotNode.id
      }
      return authorNodeData
    }),
  )

  // tags should PROBABLY be a seperate model but for now is a JSONB field of HTML option objects
  // if someone ever changes that, be sure to change this implementation
  // Noah apologizes to future readers of this codebase for being too lazy to fully refactor the schema
  const tagData = Object.keys(tags).map(id => {
    const tag = tags[id]
    const tagNodeId = createTagId(id)
    const fields = {
      name: tag.name,
      description: tag.description,
      slug: `/${kebabCase(tag.name)}`,
      posts___NODE: tagPosts[tagNodeId],
    }
    const tagNodeData = {
      ...fields,
      // gatsby required options,
      id: tagNodeId,
      parent: null,
      children: [],
      internal: {
        type: `Tag`,
        content: JSON.stringify(fields),
        contentDigest: createContentDigest(tag),
      },
    }
    return tagNodeData
  })

  const dataNodeId = `blogwise-data`
  const fields = {
    title: data.title,
    name: data.name,
    description: data.description,
    backgroundHexCode: data.backgroundHexCode,
    mainSiteUrl: data.mainSiteUrl,
    twitterUrl: data.twitterUrl,
    facebookUrl: data.facebookUrl,
    linkedinUrl: data.linkedinUrl,
  }
  const dataNodeData = {
    ...fields,
    id: dataNodeId,
    parent: null,
    children: [],
    internal: {
      type: `BlogData`,
      content: JSON.stringify(fields),
      contentDigest: createContentDigest(data),
    },
  }
  const headerNode = await createRemoteFileNode({
    url: data.headerPhotoUri,
    parentNodeId: dataNodeId,
    store,
    cache,
    createNode,
    createNodeId,
    ext: `.${data.headerPhotoUri.split('.').pop()}`,
  })
  if (headerNode) {
    dataNodeData.header___NODE = headerNode.id
  }
  const sidebarNode = await createRemoteFileNode({
    url: data.sidebarPhotoUri,
    parentNodeId: dataNodeId,
    store,
    cache,
    createNode,
    createNodeId,
    ext: `.${data.sidebarPhotoUri.split('.').pop()}`,
  })
  if (sidebarNode) {
    dataNodeData.sidebar___NODE = sidebarNode.id
  }
  const backgroundNode = await createRemoteFileNode({
    url:
      data.bgImgUri ||
      'http://greencloudcomputers.com/wp-content/uploads/2013/03/Totally-transparent.png',
    parentNodeId: dataNodeId,
    store,
    cache,
    createNode,
    createNodeId,
    ext: `.${data.bgImgUri.split('.').pop()}`,
  })
  if (backgroundNode) {
    dataNodeData.background___NODE = backgroundNode.id
  }

  postData.forEach(post => createNode(post))
  authorData.forEach(author => createNode(author))
  tagData.forEach(tag => createNode(tag))
  createNode(dataNodeData)

  return Promise.resolve()
}
