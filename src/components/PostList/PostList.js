import React from 'react'

import PostCard from './PostCard'

import styles from './PostList.module.sass'

class PostList extends React.Component {
  render() {
    const { posts, firstPostLarge } = this.props
    let LargePostCard = <div />
    if (firstPostLarge) {
      const firstPost = posts.shift()
      LargePostCard = <PostCard large post={firstPost} />
    }
    return (
      <div className={styles.PostList}>
        {LargePostCard}
        {posts.map(post => {
          return <PostCard post={post} key={post.id} />
        })}
      </div>
    )
  }
}

export default PostList
