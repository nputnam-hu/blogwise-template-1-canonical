import React from 'react'
import { InfiniteScroll } from '../infiniteScroll.tsx'
import { FaCog } from 'react-icons/fa'
import HeaderPost from '../../components/HeaderPost'
import PostList from '../../components/PostList'

import styles from './TagPageContent.module.sass'

class TagPageContent extends React.Component {
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
    const allPosts = this.props.allPosts ? this.props.allPosts : []

    const currentlyVisibleItems = g.itemsToShow || allPosts
    let Content = <div>There are no posts under this topic.</div>
    if (currentlyVisibleItems.length === 1) {
      Content = (
        <div className={styles.TagPageContent__posts}>
          <HeaderPost post={currentlyVisibleItems[0]} />
        </div>
      )
    } else if (currentlyVisibleItems.length >= 2) {
      Content = (
        <div className={styles.TagPageContent__posts}>
          <HeaderPost post={currentlyVisibleItems[0]} />
          <PostList tagPage posts={currentlyVisibleItems.slice(1)} />
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

export default TagPageContent
