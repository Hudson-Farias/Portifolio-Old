import React, { useEffect, useState } from 'react'
import { Flex, Link, Heading, Text } from '@radix-ui/themes'

import { FaLinkedin, FaGithub } from 'react-icons/fa'

interface PropsI {
    roles?: string[],
    urls?: {
        linkedin: string,
        github: string
    }
}

export default function About({ roles, urls }: PropsI) {
    const _roles = ['Desenvolvedor de Software', 'Fullstack', 'Backend', 'Frontend', 'Devops']

    const [typedText, setTypedText] = useState(_roles[0])
    const [currentIndex, setCurrentIndex] = useState(_roles[0].length)
    const [isDeleting, setIsDeleting] = useState(true)
    const [textToType, setTextToType] = useState(_roles[0])

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
                setTextToType(prevTextToType => _roles[(_roles.indexOf(prevTextToType) + 1) % _roles.length])
                return
            }
            setCurrentIndex(prevIndex => prevIndex - 1)
            setTypedText(prevTypedText => prevTypedText.slice(0, -1))
          }
        }

        const timeoutId = setTimeout(handleTyping, 150)
      
        return () => clearTimeout(timeoutId)
      }, [_roles, currentIndex, textToType, typedText, isDeleting])


    return (
        <>        
            <Flex direction='column' className='w-9/12 md:w-6/12 h-20 md:h-36'>
                <Flex align='end' gap='2'>
                    <Heading className='text-4xl md:text-8xl text-white' size='9'>Hudson</Heading>
                    <Link href={urls?.linkedin} target='_blank'>
                        <FaLinkedin className='mb-1 md:mb-4 text-2xl md:text-4xl text-white' />
                    </Link>
                    <Link href={urls?.github} target='_blank'>
                        <FaGithub className='mb-1 md:mb-4 text-2xl md:text-4xl text-white' />
                    </Link>
                </Flex>
                <Text className='text-2xl md:text-5xl min-h-16-700 text-white' weight='medium'>{typedText}</Text>
            </Flex>
        </>
    )
}