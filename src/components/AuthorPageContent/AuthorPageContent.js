import React from 'react'
import { InfiniteScroll } from '../infiniteScroll.tsx'
import { FaCog } from 'react-icons/fa'
import PostList from '../PostList'

class AuthorPageContent extends React.Component {
  componentDidMount() {
    this.props.globalState.updateState({
      isLoading: false,
    })
    if (this.props.globalState.allItems !== this.props.allPosts) {
      this.props.globalState.updateState({
        allItems: this.props.allPosts ? this.props.allPosts : [],
        numAllItems: this.props.allPosts ? this.props.allPosts.length : 0,
        itemsToShow: this.props.allPosts ? this.props.allPosts.slice(0, 1) : [],
        itemsIndex: 1,
      })
    }
  }

  render() {
    const g = this.props.globalState
    const allPosts = this.props.allPosts || []

    const currentlyVisibleItems = g.itemsToShow || allPosts

    let Content = <div>There are no posts under this author yet.</div>
    if (currentlyVisibleItems.length >= 1) {
      Content = (
        <div>
          <PostList posts={currentlyVisibleItems} />
        </div>
      )
    }
    return (
      <div>
        <InfiniteScroll
          throttle={150}
          threshold={100}
          isLoading={g.isLoading}
          hasMore={g.hasMore()}
          onLoadMore={g.loadMore}
        >
          {Content}
        </InfiniteScroll>

        {/* Loading spinner. */}
        {g.isLoading && (
          <div className="spinner">
            <FaCog />
          </div>
        )}
      </div>
    )
  }
}

export default AuthorPageContent
