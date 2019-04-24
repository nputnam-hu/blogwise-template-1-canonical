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
    const { name, slug: authorSlug, headshot } = author
    const thumbExists = Boolean(thumbnail)

    return (
      <div className={styles.Post}>
        <div className={styles.Post__thumbnailContainer}>
          {' '}
          {thumbExists && (
            <Link to={slug} className={styles.Post__link}>
              <Img
                alt={title}
                className={styles.Post__thumbnail}
                fluid={thumbnail.childImageSharp.largeFluid}
              />
            </Link>
          )}
        </div>
        <div
          className={`${styles.Post__text} ${!thumbExists &&
            styles.Post__noThumbnail}`}
        >
          <Link to={slug} className={styles.Post__link}>
            <div className={styles.Post__text__title}>{title}</div>
            <div className={styles.Post__text__description}>
              {excerpt || description}
            </div>
          </Link>
          <div className={styles.Post__text__info}>
            <Link className={styles.Post__linkContainer} to={authorSlug}>
              <Img
                alt={title}
                className={styles.Post__headshot}
                fluid={headshot.childImageSharp.small}
              />
              <div className={styles.Post__text__info__text}>
                <div className={styles.Post__text__info__author}>{name}</div>
                <Time
                  date={publishDate}
                  className={styles.Post__text__info__date}
                />
              </div>
            </Link>
          </div>
        </div>
        {/* <div className={styles.Post__thumbnailMobile}>
          {' '}
          {thumbExists && (
            <Link to={slug}>
              <Img alt={title} fluid={thumbnail.childImageSharp.largeFluid} />
            </Link>
          )}
        </div> */}
      </div>
    )
  }
}

export default PostCard
