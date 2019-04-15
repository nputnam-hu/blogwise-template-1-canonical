import React from 'react'
import { InfiniteScroll } from '../infiniteScroll.tsx'
import { FaCog } from 'react-icons/fa'
import HeaderPost from '../../components/HeaderPost'
import PostList from '../../components/PostList'

class TagPageContent extends React.Component {
  constructor(props) {
    super(props)
    console.log('*** Constructing View ***')
    if (
      !props.globalState.allItems ||
      !props.globalState.useInfiniteScroll ||
      props.globalState.slug !== props.pageContext.slug
    ) {
      props.globalState.updateState({
        slug: props.pageContext.slug,
        allItems: props.allPosts,
        numAllItems: props.allPosts.length,
        itemsToShow: props.allPosts.slice(0, 1),
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

    const currentlyVisibleItems =
      g.itemsToShow || this.props.allPosts.slice(0, 1)
    console.log('CURRENTLY VISIBLE')
    console.log(currentlyVisibleItems)

    return (
      <div>
        <InfiniteScroll
          throttle={150}
          threshold={100}
          isLoading={g.isLoading}
          hasMore={g.hasMore()}
          onLoadMore={g.loadMore}
        >
          <HeaderPost post={currentlyVisibleItems[0]} />
          <PostList posts={currentlyVisibleItems.slice(1)} />
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

export default TagPageContent
