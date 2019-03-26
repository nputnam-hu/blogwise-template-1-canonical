import React, { Component } from 'react'
import Layout from '../components/Layout'
import PostListView from '../components/PostListView'
import { SearchWidget } from '../components/SearchBar'
import { navigate } from 'gatsby'
import '../styles/search.sass'

class Search extends Component {
  constructor(props) {
    super(props)
    let q
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(this.props.location.search)
      q = params.get('q')
    }
    this.state = {
      query: q,
    }
  }
  // noop because search will automatically load in handleChange
  submitSearch = () => {}
  handleChange = event => {
    this.setState({ query: event.target.value })
    navigate(`/search?q=${this.state.query}`)
  }
  render() {
    let posts = []
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-underscore-dangle
      posts = window.__SEARCH__.search(this.state.query)
      console.log(posts)
    }
    return (
      <Layout>
        <div id="search-container">
          <SearchWidget
            autoFocus
            query={this.state.query}
            handleChange={this.handleChange}
            submitSearch={this.submitSearch}
            size="big"
          />
          <h1 id="searchresult">
            {this.state.query &&
              (posts.length > 0
                ? `Results for "${this.state.query}"`
                : `No Results for "${this.state.query}"`)}
          </h1>
          {posts.length > 0 && <PostListView posts={posts} />}
        </div>
      </Layout>
    )
  }
}
export default Search
