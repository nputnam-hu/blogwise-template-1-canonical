import React from 'react'
import Link from 'gatsby-link'

import styles from './TagList.module.sass'

class TagList extends React.Component {
  render() {
    const { tags } = this.props
    return (
      <div className={styles.Index__tags}>
        <div className={styles.Index__tags__title}>Topics</div>
        <ul className={styles.Index__tags__list}>
          {tags.map(tag => (
            <Link key={tag.slug} to={tag.slug}>
              <li>{tag.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }
}

export default TagList
