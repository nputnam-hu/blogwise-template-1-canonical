/* global __PATH_PREFIX__ */
require('prismjs/themes/prism-twilight.css')
const JsSearch = require('js-search')

exports.onClientEntry = () => {
  fetch(`${__PATH_PREFIX__}/search_index.json`)
    .then(response => response.json())
    .then(({ docs }) => {
      if (docs.length === 0) return
      const search = new JsSearch.Search('id')
      search.addIndex('title')
      search.addIndex(['author', 'name'])
      search.addIndex('tags')
      search.addDocuments(docs)
      // eslint-disable-next-line no-underscore-dangle
      window.__SEARCH__ = search
    })
    .catch(e => console.error(e, 'Failed fetch search index'))
}
