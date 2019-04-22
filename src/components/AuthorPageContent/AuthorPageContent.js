import React from 'react'
import { InfiniteScroll } from '../infiniteScroll.tsx'
import { FaCog } from 'react-icons/fa'
import PostList from '../PostList'

class AuthorPageContent extends React.Component {
  constructor(props) {
    super(props)
    if (
      !props.globalState.allItems ||
      !props.globalState.useInfiniteScroll ||
      props.globalState.slug !== props.pageContext.slug
    ) {
      props.globalState.updateState({
        slug: props.pageContext.slug,
        allItems: props.allPosts ? props.allPosts : [],
        numAllItems: props.allPosts ? props.allPosts.length : 0,
        itemsToShow: props.allPosts ? props.allPosts.slice(0, 1) : [],
        itemsIndex: 1,
      })
    }
  }

  componentDidMount() {
    this.props.globalState.updateState({
      isLoading: false,
    })
  }

  componentWillUnmount() {
    this.props.globalState.updateState({
      allItems: null,
    })
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
