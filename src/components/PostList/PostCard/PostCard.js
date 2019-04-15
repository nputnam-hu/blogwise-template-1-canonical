import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Time from '../../Time'

import styles from './PostCard.module.sass'

class PostCard extends React.Component {
  render() {
    const { post } = this.props
    const {
      title,
      description,
      slug,
      publishDate,
      thumbnail,
      author,
      excerpt,
    } = post
    const { name, slug: authorSlug } = author
    const thumbExists = Boolean(thumbnail)

    return (
      <div className={styles.Post}>
        <div className={styles.Post__thumbnail}>
          {' '}
          {thumbExists && (
            <Link to={slug}>
              <Img
                alt={title}
                className="articleimage desktop"
                fluid={thumbnail.childImageSharp.largeFluid}
              />
            </Link>
          )}
        </div>
        <div className={styles.Post__text}>
          <Link to={slug}>
            <div className={styles.Post__text__title}>{title}</div>
            <div className={styles.Post__text__description}>
              {excerpt || description}
            </div>
          </Link>
          <div className={styles.Post__text__info}>
            <Link to={authorSlug}>
              <div className={styles.Post__text__info__author}>{name}</div>
            </Link>
            <Time
              date={publishDate}
              className={styles.Post__text__info__date}
            />
          </div>
        </div>
        <div className={styles.Post__thumbnailMobile}>
          {' '}
          {thumbExists && (
            <Link to={slug}>
              <Img
                alt={title}
                className="articleimage desktop"
                fluid={thumbnail.childImageSharp.largeFluid}
              />
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default PostCard
