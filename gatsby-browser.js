/* global __PATH_PREFIX__ */
const React = require('react')
const { GlobalState } = require('./src/components/globalState')
require('prismjs/themes/prism-twilight.css')
require('./src/styles/global.sass')
const JsSearch = require('js-search')

export const onClientEntry = () => {
  fetch(`${__PATH_PREFIX__}/search_index.json`)
    .then(response => response.json())
    .then(({ docs }) => {
      if (docs.length === 0) return
      const search = new JsSearch.Search('id')
      search.addIndex('title')
      search.addIndex('authorName')
      search.addIndex('tags')
      search.addDocuments(docs)
      // eslint-disable-next-line no-underscore-dangle
      window.__SEARCH__ = search
    })
    .catch(e => console.error(e, 'Failed fetch search index'))
}

export const wrapRootElement = ({ element }) => (
  <div>
    <GlobalState>{element}</GlobalState>
  </div>
)
