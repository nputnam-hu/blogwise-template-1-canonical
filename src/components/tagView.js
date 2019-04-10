import React from 'react'
import Pagination from './pagination'
import { InfiniteScroll } from './infiniteScroll.tsx'
import { FaCog } from 'react-icons/fa'
import theme from '../theme.yaml'
import NewPostListView from '../components/NewPostListView'

class TagView extends React.Component {
  constructor(props) {
    super(props)
    console.log('*** Constructing View ***')
    if (!props.globalState.items || !props.globalState.useInfiniteScroll) {
      console.log(
        `View is initializing items according to page ${
          props.pageContext.currentPage
        }`,
      )
      props.globalState.updateState({
        slug: props.pageContext.slug,
        items: props.pageContext.pagePosts,
        cursor: props.pageContext.currentPage + 1,
      })
    }
  }

  componentDidMount() {
    this.props.globalState.updateState({
      isLoading: false,
    })
  }

  render() {
    const g = this.props.globalState
    const { pageContext } = this.props
    const paginationData = {
      currentPage: pageContext.currentPage,
      countPages: pageContext.countPages,
      useInfiniteScroll: g.useInfiniteScroll,
    }
    console.log(this.props.globalState.items)

    const currentlyVisibleItems = g.items || pageContext.pagePosts
    return (
      <div>
        <InfiniteScroll
          throttle={150}
          threshold={100}
          isLoading={g.isLoading}
          hasMore={g.hasMore(pageContext)}
          onLoadMore={g.loadMore}
        >
          <NewPostListView posts={currentlyVisibleItems} />
        </InfiniteScroll>

        {/* Loading spinner. */}
        {g.isLoading && (
          <div className="spinner">
            <FaCog />
          </div>
        )}

        {/* Fallback to Pagination for non JS users. */}
        {g.useInfiniteScroll && (
          <noscript>
            <style>{`.spinner { display: none !important; }`}</style>
            <Pagination paginationData={paginationData} />
            <h4>
              <center>Infinite Scroll does not work without JavaScript.</center>
            </h4>
          </noscript>
        )}
      </div>
    )
  }
}

export default TagView
