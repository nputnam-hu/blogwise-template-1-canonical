import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Time from '../Time'

import styles from './HeaderPost.module.sass'

class HeaderPost extends React.Component {
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
      <div className={styles.HeaderPost}>
        <div className={styles.HeaderPost__thumbnailContainer}>
          {' '}
          {thumbExists && (
            <Link to={slug}>
              <Img
                alt={title}
                className={styles.HeaderPost__thumbnail}
                fluid={thumbnail.childImageSharp.largeFluid}
              />
            </Link>
          )}
        </div>
        <div className={styles.HeaderPost__text}>
          <Link to={slug}>
            <div className={styles.HeaderPost__text__title}>{title}</div>
          </Link>
          <div className={styles.HeaderPost__text__description}>
            {excerpt || description}
          </div>
          <div className={styles.Post__text__info}>
            <Link className={styles.Post__linkContainer} to={authorSlug}>
              <Img
                alt={title}
                className={styles.Post__headshot}
                fluid={headshot.childImageSharp.small}
              />
              <div className={styles.Post__text__info__author}>{name}</div>
            </Link>
            <Time
              date={publishDate}
              className={styles.Post__text__info__date}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default HeaderPost
