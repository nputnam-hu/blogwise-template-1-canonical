import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'

import styles from '../styles/404.module.sass'

const NotFoundPage = () => (
  <Layout>
    <div className={styles.NotFoundPage}>
      <div className={styles.NotFoundPageTitle}>Page not found</div>
      <div className={styles.NotFoundPageBody}>
        We couldn&apos;t find a page at this link. You can return to the home
        page <Link to="/">here</Link>.
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
