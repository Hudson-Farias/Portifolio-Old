'use client'

import React, { useEffect, useRef, useState } from 'react'

import About from '@/components/home/about'

import styles from '@/styles/home/scrollbar.module.sass'

const snapContainers = [
  {
    id: 'about',
    label: 'sobre',
    children: <About />
  },
]

const bgColorDark = 'bg-stone-900'
const bgColorLight = 'bg-stone-600'

export default function Home() {
  const [bgColor, setbgColor] = useState(bgColorDark)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = scrollContainerRef.current
      if (!scrollContainer) return

      const scrollPosition = scrollContainer.scrollTop
      const sectionHeight = scrollContainer.clientHeight
      
      const newSection = scrollPosition / sectionHeight

      if (newSection % 1 > 0.7) {
        const color = Math.ceil(newSection) % 2 === 0 ? bgColorDark : bgColorLight
        setbgColor(color)

      } else if (newSection % 1 < 0.03) {
        const color = Math.floor(newSection) % 2 === 0 ? bgColorDark : bgColorLight
        setbgColor(color)
      }
    }

    const scrollContainer = scrollContainerRef.current
    scrollContainer && scrollContainer.addEventListener('scroll', handleScroll)
  }, [])


  return (
    <main className={`h-screen grid ${snapContainers.length > 1 ? 'grid-rows-[3rem,1fr]' : 'grid-rows-[0rem,1fr]'}`}>

      <header className={`min-h-3 ${bgColor}`}>
        <nav className='flex items-center justify-end gap-5 pr-5 h-full'>
          { snapContainers.length > 1 && snapContainers.map(container => <a href={`#${container.id}`} key={container.id}>{container.label}</a>) }
        </nav>
      </header>
        
      <div ref={scrollContainerRef} className={`${styles.scrollbar} snap-mandatory snap-y overflow-auto h-full`}>
        { snapContainers.map((container, index) => 
          <div id={container.id} className={`snap-center flex items-center justify-center h-full ${index % 2 === 0 ? bgColorLight : bgColorDark}`}  key={container.id}>
            {container.children}
          </div>
        )} 
      </div>

    </main>
  )
}
