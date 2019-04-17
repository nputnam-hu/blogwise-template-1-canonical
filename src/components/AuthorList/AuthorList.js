import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import AuthorCard from './AuthorCard'

import styles from './AuthorList.module.sass'

class AuthorList extends React.Component {
  render() {
    let AuthorListContents = <div />
    if (this.props.author !== undefined) {
      AuthorListContents = <AuthorCard author={this.props.author} />
    } else if (this.props.authors !== undefined) {
      AuthorListContents = this.props.authors.map(ele => {
        const author = ele.node
        return <AuthorCard author={author} key={author.id} />
      })
    }

    return <div className={styles.AuthorList}>{AuthorListContents}</div>
  }
}

export default AuthorList
