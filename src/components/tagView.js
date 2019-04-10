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
      console.log(props.pageContext.pagePosts)
      props.globalState.updateState({
        items: props.pageContext.pagePosts,
        cursor: props.pageContext.currentPage + 1,
      })
      console.log(props.globalState.items)
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

    const currentlyVisibleItems = pageContext.pagePosts
    console.log(currentlyVisibleItems)
    return (
      <div>
        <InfiniteScroll
          throttle={150}
          threshold={1800}
          isLoading={g.isLoading}
          hasMore={g.hasMore(pageContext)}
          onLoadMore={g.loadMore}
        >
          <NewPostListView posts={currentlyVisibleItems} />
        </InfiniteScroll>
        {/* Notification for demo purposes. */}
        {g.useInfiniteScroll && !g.hasMore(pageContext) && !g.isLoading && (
          <div style={{ paddingTop: '40px' }}>
            <h4>
              <center>
                Congrats! You scrolled through all
                {` ${g.items.length} `}
                items starting from page
                {` ${pageContext.currentPage}`}.
                {/* TODO: fix: Go to page <Link to="/">one</Link>? */}
              </center>
            </h4>
          </div>
        )}

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

        {/* Fallback to Pagination on toggle (for demo) and also on error. */}
        {!g.useInfiniteScroll && <Pagination paginationData={paginationData} />}

        <style jsx>
          {`
            @keyframes spinner {
              to {
                transform: rotate(360deg);
              }
            }
            .spinner {
              margin-top: 40px;
              font-size: 60px;
              text-align: center;
              display: ${g.useInfiniteScroll ? 'block' : 'none'};
              :global(svg) {
                fill: ${theme.color.brand.primaryLight};
                animation: spinner 3s linear infinite;
              }
            }
          `}
        </style>
      </div>
    )
  }
}

export default TagView
