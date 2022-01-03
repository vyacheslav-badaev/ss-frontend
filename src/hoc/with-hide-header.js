import React, { useRef, useEffect, useState } from 'react'
const withHideHeader = HeaderComponent =>
  function WithHideHeaderComponent(props) {
    const headerRef = useRef(null)
    const [prevScrollPosition, setPrevScrollPosition] = useState(
      process.browser ? window.pageYOffset : 0
    )
    function handlePageScroll() {
      if (headerRef.current === null) return
      const currentScrollPosition = window.pageYOffset
      if (
        currentScrollPosition <= 0 ||
        prevScrollPosition > currentScrollPosition
      ) {
        headerRef.current.style.top = '0'
      } else {
        headerRef.current.style.top = '-64px'
      }
      setPrevScrollPosition(currentScrollPosition)
    }
    useEffect(() => {
      window.addEventListener('scroll', handlePageScroll, {
        passive: true,
      })
      return function cleanup() {
        window.removeEventListener('scroll', handlePageScroll)
      }
    })
    return <HeaderComponent {...props} ref={headerRef} />
  }
export default withHideHeader
