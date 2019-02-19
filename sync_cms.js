// reads in data from `./src/constants/user.json` and syncs cms options across fields
const fs = require('fs')
const yaml = require('js-yaml')
const _ = require('lodash')
const user = require('./src/constants/user.json')

const { authors, tags } = user

;(() => {
  const doc = yaml.safeLoad(
    fs.readFileSync('./static/admin/config.yml'),
    'utf-8',
  )
  doc.logo_url = user.logoUri
  const blogIndex = _.findIndex(doc.collections, { name: 'blog' })
  const blogFields = doc.collections[blogIndex].fields
  const authorIndex = _.findIndex(blogFields, { name: 'author' })
  const tagsIndex = _.findIndex(blogFields, { name: 'tags' })
  doc.collections[blogIndex].fields[authorIndex].options = Object.keys(
    authors,
  ).map(key => ({
    label: authors[key].name,
    value: key,
  }))
  doc.collections[blogIndex].fields[tagsIndex].options = Object.keys(tags).map(
    key => ({
      label: tags[key].name,
      value: key,
    }),
  )
  fs.writeFileSync('./static/admin/config.yml', yaml.safeDump(doc))
})()
