'use client'

import React, { useEffect, useRef, useState } from 'react'

import About from '@/components/home/about'

import styles from '@/styles/scrollbar.module.sass'

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
    <main className='h-screen grid'>

      <header className={`row-end-2 ${bgColor}`}>
        <nav className='flex items-center justify-end gap-5 pr-5 h-full'>
          <a href='#about'>sobre</a>
          <a href='#stack'>stack</a>
          <a href='#projects'>projetos</a>
        </nav>
      </header>
        
      <div ref={scrollContainerRef} className={`${styles.scrollbar} snap-mandatory snap-y overflow-auto row-start-2 row-end-13 h-full`}>
        <div id='about' className={`snap-center flex items-center justify-center h-full ${bgColorLight}`}><About /></div>
        <div id='stack' className={`snap-center flex items-center justify-center h-full ${bgColorDark}`}><span>stack</span></div>
        <div id='projects' className={`snap-center flex items-center justify-center h-full ${bgColorLight}`}><span>projects</span></div>
      </div>

    </main>
  )
}