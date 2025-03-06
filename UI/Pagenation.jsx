import React from 'react'
import "../src/Styles/pagenation.css"

function Pagenation({totalPosts,postperpage,setCurrentpage,currentPage}) {
      let pages=[];
      for(let i=1; i<=Math.ceil(totalPosts / postperpage); i++){
            pages.push(i);
      }
  return (
      <div className='pagination'>
      {pages.map((page, index) => {
          return (
              <button
                  key={index}
                  onClick={() => setCurrentpage(page)}
                  className={page == currentPage ? "active" : ""}>
                  {page}
              </button>
          );
      })}
  </div>
  )
}

export default Pagenation

