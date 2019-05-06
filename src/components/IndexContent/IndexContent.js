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
import searchIcon from './search.svg'
import { FaCog } from 'react-icons/fa'

import { InfiniteScroll } from '../infiniteScroll.tsx'

import styles from './IndexContent.module.sass'

class IndexContent extends React.Component {
  componentDidMount() {
    this.props.globalState.updateState({
      isLoading: false,
    })
    if (this.props.globalState.allItems !== this.props.allPosts) {
      this.props.globalState.updateState({
        allItems: this.props.allPosts ? this.props.allPosts : [],
        numAllItems: this.props.allPosts ? this.props.allPosts.length : 0,
        itemsToShow: this.props.allPosts ? this.props.allPosts.slice(0, 1) : [],
        itemsIndex: 1,
      })
    }
  }

  render() {
    const { blogData, tags } = this.props
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

    const g = this.props.globalState
    const allPosts = this.props.allPosts ? this.props.allPosts : []

    const currentlyVisibleItems = g.itemsToShow || allPosts
    console.log(allPosts)
    console.log(g.itemsToShow)

    // Construct tags list
    const TagsList = (
      <div className={styles.Index__tagsContainer}>
        {tags && tags.length > 0 && (
          <TagList title="Topics" tags={tags.map(ele => ele.node)} />
        )}
      </div>
    )

    // Construct featured articles
    let FeaturedArticles = <div>Sorry, no posts yet! Come back later.</div>
    if (currentlyVisibleItems.length >= 1) {
      FeaturedArticles = (
        <PostList posts={currentlyVisibleItems}>
          <div className={styles.Index__midContent}>
            <hr className={styles.Index__midContent__linebreak} />
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
            <hr className={styles.Index__midContent__linebreak} />
          </div>
        </PostList>
      )
    }

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
        <div>
          {background.childImageSharp ? (
            <div>
              <Background
                className={styles.Index__headerContainer}
                fluid={background.childImageSharp.fluid}
              >
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
              </Background>
            </div>
          ) : (
            <div
              style={{ background: backgroundHexCode }}
              className={styles.Index__headerContainer}
            >
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
            </div>
          )}
        </div>
        <div className={styles.Index__contentContainer}>
          {/* Featured Articles */}
          <div className={styles.Index__content}>
            <div className={styles.Index__mobileMenu}>
              {(twitterUrl || facebookUrl || linkedinUrl) && (
                <div className={styles.Index__mobileMenu__social}>
                  {twitterUrl && (
                    <a
                      href={twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={twitter} alt="twitter" />
                    </a>
                  )}
                  {facebookUrl && (
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={facebook} alt="facebook" />
                    </a>
                  )}
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={linkedin} alt="linkedin" />
                    </a>
                  )}
                  <span style={{ color: '#B3B3B3' }}>|</span>
                </div>
              )}
              <Link to="/search" className={styles.Index__mobileMenu__search}>
                <img src={searchIcon} alt="Search Posts" />
              </Link>
            </div>
            <div className={styles.Index__content__header}>
              <div className={styles.Index__content__header__title}>
                Featured Articles
              </div>
            </div>
            <div>
              <InfiniteScroll
                throttle={150}
                threshold={100}
                isLoading={g.isLoading}
                hasMore={g.hasMore()}
                onLoadMore={g.loadMore}
              >
                {FeaturedArticles}
              </InfiniteScroll>

              {/* Loading spinner. */}
              {g.isLoading && (
                <div className="spinner">
                  <FaCog />
                </div>
              )}
            </div>
          </div>
          {/* Right Side Content */}
          <div className={styles.Index__rightContent}>
            <div className={styles.Index__rightContent__search}>
              <Searchbar />
            </div>
            {/* About Section  */}
            <div className={styles.Index__about}>
              <div className={styles.Index__about__title}>About {name}</div>
              <div className={styles.Index__about__sidebar}>
                <Img
                  alt={`${name} logo`}
                  fixed={sidebar.childImageSharp.fixed}
                  id="rightlogo"
                />
              </div>
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
}
export default IndexContent
