import React from 'react'

import GridItem from './gridItem'

const Grid = ({ items }) => (
  <>
    <div className="grid">
      {items.map(item => (
        <GridItem item={item} key={item} />
      ))}
    </div>
    <style jsx>
      {`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          grid-gap: 1px;
        }
        @media (max-width: 800px) {
          .grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
        @media (max-width: 300px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}
    </style>
  </>
)

export default Grid
