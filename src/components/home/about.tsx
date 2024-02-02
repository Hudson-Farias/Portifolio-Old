import React, { useEffect, useState } from 'react'
import { Typography } from '@material-tailwind/react'
import { FaLinkedin, FaWhatsapp, FaGithub } from 'react-icons/fa'

export default function About() {
    const roles = ['Desenvolvedor de Software', 'Programador Fullstack',
    // 'Devops', 'Programador Backend', 'Desenvolvedor', 'Programador Frontend'
    ]

    const [typedText, setTypedText] = useState(roles[0])
    const [currentIndex, setCurrentIndex] = useState(roles[0].length)
    const [isDeleting, setIsDeleting] = useState(true)
    const [textToType, setTextToType] = useState(roles[0])

    useEffect(() => {
        const handleTyping = () => {
          if (!isDeleting) {
            if (currentIndex === textToType.length) {
                setTimeout(() => setIsDeleting(true), 3000)
                return
            }
            setTypedText(prevTypedText => prevTypedText + textToType[currentIndex])
            setCurrentIndex(prevIndex => prevIndex + 1)

        } else {
            if (typedText.length === 0) {
                setIsDeleting(false)
                setTextToType(prevTextToType => roles[(roles.indexOf(prevTextToType) + 1) % roles.length])
                return
            }
            setCurrentIndex(prevIndex => prevIndex - 1)
            setTypedText(prevTypedText => prevTypedText.slice(0, -1))
          }
        }

        const timeoutId = setTimeout(handleTyping, 150)
      
        return () => clearTimeout(timeoutId)
      }, [currentIndex, textToType, typedText, isDeleting])


    return (
        <>        
            <div className='flex flex-col w-8/12'>
                <div className='flex items-end gap-2'>
                    <Typography className='md:text-9xl' variant='h1' placeholder>Hudson</Typography>
                    <FaLinkedin className='mb-4 text-4xl' />
                    <FaWhatsapp className='mb-4 text-4xl' />
                    <FaGithub className='mb-4 text-4xl' />
                </div>
                <Typography className='md:text-6xl min-h-16-700' variant='h5' placeholder>{typedText}</Typography>
            </div>
        </>
    )
}