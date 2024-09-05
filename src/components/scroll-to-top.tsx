import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

interface ScrollToTopProps {
  selector: string
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ selector }) => {
  const { pathname } = useLocation()
  const scrollRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    scrollRef.current = document.querySelector(selector)

    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0)
    }
  }, [pathname, selector])

  return null
}
