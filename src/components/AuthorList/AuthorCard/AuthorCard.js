import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './AuthorCard.module.sass'

class AuthorCard extends React.Component {
  render() {
    return (
      <div className={styles.AuthorCard}>
        <div className={styles.AuthorCard__container1}>
          <Link style={{ textDecoration: 'none' }} to={this.props.author.slug}>
            <Img
              className={styles.AuthorCard__container1__image}
              alt={`${this.props.author.name} headshot`}
              fixed={this.props.author.headshot.childImageSharp.fixed}
            />
          </Link>
          <div className={styles.AuthorCard__container1__name}>
            {this.props.author.name}
          </div>
        </div>
        <div className={styles.AuthorCard__container2}>
          <Link
            style={{ textDecoration: 'none' }}
            to={this.props.author.slug}
            className={styles.AuthorCard__container2__name}
          >
            <div>{this.props.author.name}</div>
          </Link>
          <div className={styles.AuthorCard__container2__bio}>
            {this.props.author.bio}
          </div>
        </div>
      </div>
    )
  }
}

export default AuthorCard
