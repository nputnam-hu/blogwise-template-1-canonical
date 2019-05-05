import React from 'react'
import { InfiniteScroll } from '../infiniteScroll.tsx'
import { FaCog } from 'react-icons/fa'
import HeaderPost from '../../components/HeaderPost'
import PostList from '../../components/PostList'

import styles from './TagPageContent.module.sass'

class TagPageContent extends React.Component {
  constructor(props) {
    super(props)
    props.globalState.updateState({
      allItems: null,
      itemsToShow: null,
    })
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

  render() {
    const g = this.props.globalState
    const allPosts = this.props.allPosts ? this.props.allPosts : []
    console.log(g.allItems)

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
