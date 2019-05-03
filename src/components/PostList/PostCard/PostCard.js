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
      thumbnailUri,
      author,
      authorName,
      authorHeadshotUri,
      authorSlugFallback,
      excerpt,
    } = post
    const { name, slug: authorSlug, headshot } = author
    const thumbExists = Boolean(thumbnail)
    const thumbnailUriExists = Boolean(thumbnailUri)
    const headshotExists = Boolean(headshot)
    const headshotUriExists = Boolean(authorHeadshotUri)
    console.log(authorSlugFallback)
    let renderedThumbnail = <div />
    let renderedHeadshot = <div />

    if (thumbExists) {
      renderedThumbnail = (
        <div className={styles.Post__thumbnailContainer}>
          <Link to={slug} className={styles.Post__thumbnailLink}>
            <div>
              <Img
                alt={title}
                className={styles.Post__thumbnail}
                fluid={thumbnail.childImageSharp.largeFluid}
              />
            </div>
          </Link>
        </div>
      )
    } else if (thumbnailUriExists) {
      renderedThumbnail = (
        <div className={styles.Post__thumbnailContainer}>
          <Link to={slug} className={styles.Post__thumbnailLink}>
            <div>
              <img
                alt={title}
                className={styles.Post__thumbnailUri}
                src={thumbnailUri}
              />
            </div>
          </Link>
        </div>
      )
    }
    if (headshotExists) {
      renderedHeadshot = (
        <Img
          alt={title}
          className={styles.Post__headshot}
          fluid={headshot.childImageSharp.small}
        />
      )
    } else if (headshotUriExists) {
      renderedHeadshot = (
        <img
          alt="author headshot"
          className={styles.Post__headshot}
          src={authorHeadshotUri}
        />
      )
    }
    return (
      <div className={styles.Post}>
        {renderedThumbnail}
        <div
          className={`${styles.Post__text} ${
            thumbExists || thumbnailUriExists ? '' : styles.Post__noThumbnail
          }`}
        >
          <Link to={slug} className={styles.Post__link}>
            <div className={styles.Post__text__title}>{title}</div>
            <div className={styles.Post__text__description}>
              {excerpt || description}
            </div>
          </Link>
          <div className={styles.Post__text__info}>
            <Link
              className={styles.Post__linkContainer}
              to={authorSlug || authorSlugFallback}
            >
              {renderedHeadshot}
              <div className={styles.Post__text__info__text}>
                <div className={styles.Post__text__info__author}>
                  {name || authorName}
                </div>
                <Time
                  date={publishDate}
                  className={styles.Post__text__info__date}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default PostCard
