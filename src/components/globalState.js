import React from 'react'

export const GlobalStateContext = React.createContext({
  items: null,
  isLoading: true,
  cursor: 0 /* Which page infinite scroll should fetch next. */,
  useInfiniteScroll: true /* Toggle between pagination and inf. scroll for this demo & fallback in case of error. */,
  updateState: () => {},
  hasMore: () => {},
  loadMore: () => {},
  toggle: () => {},
})

export class GlobalState extends React.Component {
  constructor(props) {
    super(props)

    console.log('*** Constructing Global State ***')

    this.loadMore = this.loadMore.bind(this)
    this.hasMore = this.hasMore.bind(this)
    this.updateState = this.updateState.bind(this)

    this.state = {
      items: null,
      isLoading: true,
      cursor: 0,
      useInfiniteScroll: true,
      updateState: this.updateState,
      hasMore: this.hasMore,
      loadMore: this.loadMore,
      toggle: this.toggle,
    }
  }

  componentDidUpdate() {
    console.log(`Showing ${this.state.items.length} posts.`)
  }

  updateState = mergeableStateObject => {
    this.setState(mergeableStateObject)
  }

  loadMore = () => {
    this.setState({ isLoading: true, error: undefined })
    console.log('Loading more...')
    fetch(`/paginationJson/index${this.state.cursor}.json`)
      .then(res => res.json())
      .then(
        res => {
          this.setState(state => ({
            items: [...state.items, ...res], // Add resulting post items to state.items
            cursor: state.cursor + 1, // Update which page should be fetched next
            isLoading: false, // Loading is complete so a new load can be triggered.
          }))
        },
        error => {
          this.setState({
            isLoading: false,
            error,
            useInfiniteScroll: false, // Fallback to Pagination on error.
          })
        },
      )
  }

  hasMore = pageContext =>
    this.state.cursor <= pageContext.countPages && this.state.useInfiniteScroll

  render() {
    return (
      <GlobalStateContext.Provider value={this.state}>
        {this.props.children}
      </GlobalStateContext.Provider>
    )
  }
}
