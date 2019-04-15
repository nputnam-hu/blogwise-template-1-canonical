import React from 'react'

export const GlobalStateContext = React.createContext({
  allItems: null,
  numAllItems: 0,
  itemsToShow: null,
  itemsIndex: 1,
  isLoading: true,
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
      allItems: null,
      numAllItems: 0,
      itemsToShow: null,
      itemsIndex: 1, // Last item which is currently shown
      isLoading: true,
      useInfiniteScroll: true,
      updateState: this.updateState,
      hasMore: this.hasMore,
      loadMore: this.loadMore,
      toggle: this.toggle,
    }
  }

  componentDidUpdate() {
    console.log(`Showing ${this.state.itemsToShow.length} posts.`)
  }

  updateState = mergeableStateObject => {
    this.setState(mergeableStateObject)
  }

  loadMore = () => {
    this.setState({ isLoading: true, error: undefined })
    console.log('Loading more...')

    // Increment the item index
    this.setState(state => ({
      itemsIndex: state.itemsIndex + 1,
    }))
    const i = this.state.itemsIndex

    // Load new items
    console.log('ALL ITEMS')
    console.log(this.state.allItems)

    const newItems = this.state.allItems.slice(0, i + 1)
    console.log(`NEW ITEMS`)
    console.log(newItems)

    // Add new items to ones visible.
    this.setState({
      isLoading: false,
      itemsToShow: [...newItems],
    })
    console.log('ITEMS TO SHOW')
    console.log(this.state.itemsToShow)
  }

  hasMore = () => {
    console.log(`itemsIndex: ${this.state.itemsIndex}`)
    console.log(`numAllItems: ${this.state.numAllItems}`)
    console.log(`useInfiniteScroll: ${this.state.useInfiniteScroll}`)

    return (
      this.state.itemsIndex <= this.state.numAllItems + 1 &&
      this.state.useInfiniteScroll
    )
  }
  render() {
    return (
      <GlobalStateContext.Provider value={this.state}>
        {this.props.children}
      </GlobalStateContext.Provider>
    )
  }
}
