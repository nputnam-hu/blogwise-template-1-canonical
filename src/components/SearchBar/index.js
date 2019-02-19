import React, { Component } from 'react'
import { navigate } from 'gatsby'
import SearchIcon from './search.svg'
import './styles.sass'

export const SearchWidget = ({
  query = '',
  handleChange,
  submitSearch,
  autoFocus = false,
  size = '',
}) => (
  <div>
    <input
      id="searchbar"
      type="text"
      className={size}
      value={query}
      onChange={handleChange}
      onKeyPress={e => {
        if (e.key === 'Enter') {
          submitSearch()
        }
      }}
      placeholder="Search Posts"
      // eslint-disable-next-line
      autoFocus={autoFocus}
    />
    <button className={size} id="searchbutton" onClick={submitSearch}>
      <img
        className={size}
        id="searchicon"
        alt="search posts"
        src={SearchIcon}
      />
    </button>
  </div>
)

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: props.query || '',
    }
  }
  submitSearch = () => {
    if (this.state.query) {
      navigate(`/search?q=${this.state.query}`)
    }
  }
  handleChange = event => {
    this.setState({ query: event.target.value })
  }
  render() {
    return (
      <SearchWidget
        query={this.state.query}
        submitSearch={this.submitSearch}
        handleChange={this.handleChange}
      />
    )
  }
}

export default SearchBar
