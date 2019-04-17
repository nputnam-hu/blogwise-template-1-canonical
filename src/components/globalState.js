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

  updateState = mergeableStateObject => {
    this.setState(mergeableStateObject)
  }

  loadMore = () => {
    this.setState({ isLoading: true, error: undefined })

    // Increment the item index
    this.setState(state => ({
      itemsIndex: state.itemsIndex + 1,
    }))
    const i = this.state.itemsIndex

    const newItems = this.state.allItems.slice(0, i + 1)

    // Add new items to ones visible.
    this.setState({
      isLoading: false,
      itemsToShow: [...newItems],
    })
  }

  hasMore = () =>
    this.state.itemsIndex <= this.state.numAllItems + 1 &&
    this.state.useInfiniteScroll

  render() {
    return (
      <GlobalStateContext.Provider value={this.state}>
        {this.props.children}
      </GlobalStateContext.Provider>
    )
  }
}
