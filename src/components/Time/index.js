import React from 'react'
import moment from 'moment'
import small from './time_small.svg'
import med from './time_med.svg'
import large from './time_large.svg'
import './styles.sass'

const genText = function genText(date) {
  const m = moment(date)
  const now = moment()
  const daysBetween = moment.duration(now.diff(m)).asDays()
  const roundedDays = Math.floor(daysBetween)
  if (roundedDays === 0) return 'a couple of hours ago'
  if (roundedDays < 30) {
    return `${roundedDays} ${roundedDays === 1 ? 'day' : 'days'} ago`
  }
  const roundedMonths = Math.floor(daysBetween / 30)
  if (roundedMonths < 12) {
    return `${roundedMonths} ${roundedMonths === 1 ? 'month' : 'months'} ago`
  }
  const roundedYears = Math.floor(daysBetween / 365)
  return `${roundedYears} ${roundedYears === 1 ? 'year' : 'years'} ago`
}

const genFontSize = function genFontSize(size) {
  switch (size) {
    case 'small':
      return '14px'
    case 'med':
      return '14px'
    case 'large':
      return '16px'
    default:
      return null
  }
}

const genPadding = function genPadding(size) {
  switch (size) {
    case 'small':
      return '1px'
    case 'med':
      return '2px'
    case 'large':
      return '0px'
    default:
      return null
  }
}

const genMarginTop = function genMarginTop(size) {
  switch (size) {
    case 'small':
      return '0px'
    case 'med':
      return '2px'
    case 'large':
      return '0px'
    default:
      return null
  }
}

const genSVG = function genSVG(size) {
  switch (size) {
    case 'small':
      return small
    case 'med':
      return med
    case 'large':
      return large
    default:
      return null
  }
}

// size prop is one of ['small', 'med', 'large']
// there are 3 different use-cases for Time component in the app
const Time = ({ date, size = 'small' }) => (
  <div className="time-container">
    <img
      alt={date.toString()}
      style={{ paddingTop: genPadding(size) }}
      src={genSVG(size)}
    />
    <span
      className="time-text"
      style={{ fontSize: genFontSize(size), marginTop: genMarginTop(size) }}
    >
      {genText(date)}
    </span>
  </div>
)

export default Time
