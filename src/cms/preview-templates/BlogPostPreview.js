import React from 'react'
import { BlogPostTemplate } from '../../templates/blog-post'
import { authors } from '../../constants/user.json'

const BlogPostPreview = ({ entry, widgetFor }) => (
  <BlogPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
    date={entry.getIn(['data', 'date'])}
    author={authors[entry.getIn(['data', 'author'])]}
  />
)

export default BlogPostPreview
