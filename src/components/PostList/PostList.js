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

    const customStyles = []

    if (this.props.tagPage === true) {
      customStyles.push('tagPage')
    }

    let PostCards = <div />
    if (posts && posts.length <= 3) {
      PostCards = posts.map(post => {
        return (
          <PostCard customStyles={customStyles} post={post} key={post.id} />
        )
      })
    } else if (posts && posts.length > 3) {
      const firstHalf = posts.slice(0, 3)
      const secondHalf = posts.slice(3)
      PostCards = (
        <div>
          {firstHalf.map(post => (
            <PostCard customStyles={customStyles} post={post} key={post.id} />
          ))}
          {this.props.children}
          {secondHalf.map(post => (
            <PostCard customStyles={customStyles} post={post} key={post.id} />
          ))}
        </div>
      )
    }
    return (
      <div className={styles.PostList}>
        {LargePostCard}
        {PostCards}
      </div>
    )
  }
}

export default PostList
