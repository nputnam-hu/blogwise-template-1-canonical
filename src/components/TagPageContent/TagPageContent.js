import React from 'react'
import { InfiniteScroll } from '../infiniteScroll.tsx'
import { FaCog } from 'react-icons/fa'
import NewPostListView from '../../components/NewPostListView'
import PostList from '../../components/PostList'

class TagPageContent extends React.Component {
  constructor(props) {
    super(props)
    console.log('*** Constructing View ***')
    if (!props.globalState.items || !props.globalState.useInfiniteScroll) {
      props.globalState.updateState({
        slug: props.pageContext.slug,
        allItems: props.allPosts,
        numAllItems: props.allPosts.length,
        itemsToShow: props.pageContext.pagePosts
          .slice(0, 1)
          .map(post => post.node),
      })
    }
  }

  componentDidMount() {
    this.props.globalState.updateState({
      isLoading: false,
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
          <PostList posts={currentlyVisibleItems} />
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
