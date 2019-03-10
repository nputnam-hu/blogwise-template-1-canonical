import CMS from 'netlify-cms'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import '../templates/about-page/styles.sass'
import '../templates/blog-post/styles.sass'

CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
