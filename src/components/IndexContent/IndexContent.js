import React from 'react'
import Img from 'gatsby-image'
import Background from 'gatsby-background-image'
import Link from 'gatsby-link'
import Searchbar from '../Searchbar'
import PostList from '../PostList'
import TagList from '../TagList'
import linkedin from './linkedin.png'
import facebook from './facebook.png'
import twitter from './twitter.png'

import styles from './IndexContent.module.sass'

const IndexContent = ({ posts, blogData, tags }) => {
  const {
    title,
    name,
    description,
    backgroundHexCode,
    headerTextColor,
    header,
    sidebar,
    background,
    twitterUrl,
    facebookUrl,
    linkedinUrl,
  } = blogData

  // Build header contents
  const HeaderContent = (
    <div
      className={styles.Index__header}
      style={{ background: background ? '' : backgroundHexCode }}
    >
      <Img
        className={styles.Index__header__img}
        alt={`${name} logo`}
        fixed={header.childImageSharp.fixed}
      />
      <div
        className={styles.Index__header__text}
        style={{ color: headerTextColor }}
      >
        {title}
      </div>
    </div>
  )

  // Wrap header contents
  const Header = background.childImageSharp ? (
    <Background
      className={styles.Index__headerContainer}
      fluid={background.childImageSharp.fluid}
    >
      {HeaderContent}
    </Background>
  ) : (
    <div
      style={{ background: backgroundHexCode }}
      className={styles.Index__headerContainer}
    >
      {HeaderContent}
    </div>
  )

  // Construct featured articles
  let FeaturedArticles = <div>Sorry, no posts yet! Come back later.</div>
  if (posts.length !== 0) {
    FeaturedArticles = <PostList posts={posts.map(p => p.node)} />
  }

  // Construct tags list
  const TagsList = (
    <div className={styles.Index__tagsContainer}>
      {tags && tags.length > 0 && <TagList tags={tags.map(ele => ele.node)} />}
    </div>
  )

  // Construct social media icons
  const SocialMediaIcons = (
    <div className={styles.Index__socialContainer}>
      {(twitterUrl || facebookUrl || linkedinUrl) && (
        <div className={styles.Index__social}>
          <div className={styles.Index__social__title}>Find us on</div>
          <div className={styles.Index__social__links}>
            {twitterUrl && (
              <a
                className={styles.Index__social__link}
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={twitter} alt="twitter" />
              </a>
            )}
            {facebookUrl && (
              <a
                className={styles.Index__social__link}
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="facebook" />
              </a>
            )}
            {linkedinUrl && (
              <a
                className={styles.Index__social__link}
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedin} alt="linkedin" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className={styles.Index}>
      {/* Header Image */}
      {Header}
      <div className={styles.Index__contentContainer}>
        {/* Featured Articles */}
        <div className={styles.Index__content}>
          <div className={styles.Index__content__header}>
            <div className={styles.Index__content__header__title}>
              Featured Articles
            </div>
            <Link className={styles.Index__content__header__link} to="/latest">
              See all
            </Link>
          </div>
          {FeaturedArticles}
        </div>
        {/* Right Side Content */}
        <div className={styles.Index__rightContent}>
          <Searchbar />
          {/* About Section  */}
          <div className={styles.Index__about}>
            <div className={styles.Index__about__title}>About {name}</div>
            <div className={styles.Index__about__description}>
              {description}
            </div>
            <Link className={styles.Index__about__link} to="/about">
              Read more &gt;
            </Link>
          </div>
          {/* Tags Section */}
          {TagsList}
          {/* Social Icons Section */}
          {SocialMediaIcons}
        </div>
      </div>
    </div>
  )
}
export default IndexContent
