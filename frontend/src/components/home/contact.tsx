import React, { useState } from 'react'
import axios from 'axios'
import { Card, Flex, Link, Text, TextField, TextArea, Button } from '@radix-ui/themes'

import { FaWhatsapp, FaDiscord } from 'react-icons/fa'

interface PropsI {
    urls?: {
        whatssap: string,
        discord: string
    }
}

const contactFormDefault = {
    name: '',
    last_name: '',
    email: '',
    message: ''
}

export default function Contact({ urls }: PropsI) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    const [contactData, setContactData] = useState(contactFormDefault)
    const [isToastVisible, setToastVisible] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const key = event.target.name
        const value = event.target.value
        setContactData(prevContactData => { return {...prevContactData, [key]: value }})
    }

    const submitFormContact = async () => {
        const values = Object.values(contactData);
        if (!values.every(value => value)) return

        await axios.post(`${apiUrl}/contact`, contactData)
        setContactData(contactFormDefault)
        setToastVisible(true)

        setTimeout(() => {
            setToastVisible(false);
        }, 10000)
    }

    return (
        <>
            <Card className='w-11/12 md:w-max' variant='ghost'>
                <Flex direction='column' justify='center' gap='3'>
                    <Text className='text-3xl mb-4 text-white' as='p'>Contate-me</Text>
                    
                    <Flex justify='between' gap='3'>
                        <TextField.Input onChange={handleChange} value={contactData.name} placeholder='Nome' name='name' />
                        <TextField.Input onChange={handleChange} value={contactData.last_name} placeholder='Sobrenome' name='last_name' />
                    </Flex>

                    <TextField.Input onChange={handleChange} value={contactData.email} placeholder='Email' name='email' type='email' />
                    <TextArea onChange={handleChange} value={contactData.message} placeholder='Mensagem' name='message' />

                    <Flex direction='column' gap='2'>
                        <Button className='w-full' onClick={submitFormContact} color='gray' size='3'>Enviar</Button>

                        <Flex gap='2'>
                            <Link className='w-1/2' href={urls?.whatssap || undefined} target='_blank'>
                                <Button className='flex items-center w-full' color='grass' size='3'>
                                    <FaWhatsapp className='text-xl' />Whatsapp
                                </Button>
                            </Link>
                            <Link className='w-1/2' href={urls?.discord || undefined} target='_blank'>
                                <Button className='flex items-center w-full' color='indigo' size='3'>
                                    <FaDiscord className='text-xl' />Discord
                                </Button>
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>

            <Card className={`absolute bottom-0 mb-3 ${isToastVisible ? '' : 'hidden'}`} variant='ghost'>
                <Text className='text-white'>Enviado</Text>
            </Card> 
        </>
    )
}