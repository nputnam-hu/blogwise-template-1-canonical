import React from 'react'
import moment from 'moment'
import styles from './Time.module.sass'

class Time extends React.Component {
  render() {
    const { date } = this.props
    const m = moment(date)
    const now = moment()
    const daysSince = m.diff(now, 'days')
    let formattedDate = <div />
    let TimeStyles = styles.Time__text
    if (this.props.large === true) {
      TimeStyles = styles.Time__text__large
    }

    if (daysSince > -1) {
      formattedDate = 'A couple of hours ago...'
    } else if (daysSince > -7) {
      formattedDate = `${-daysSince} ${daysSince === -1 ? 'day' : 'days'} ago`
    } else if (daysSince <= -7) {
      formattedDate = m.format('MMMM Do, YYYY')
    }

    return <div className={TimeStyles}>{formattedDate}</div>
  }
}

export default Time
