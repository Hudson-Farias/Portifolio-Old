import React, { useState } from 'react'
import axios from 'axios'
import { Card, Flex, Link, Text, TextField, TextArea, Button } from '@radix-ui/themes'

import { FaWhatsapp, FaDiscord } from 'react-icons/fa'

export default function Contact() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    const [buttonFormState, setButtonFormState] = useState({
        text: 'Enviar',
        disabled: false
    })
    const [contactData, setContactData] = useState({
        name: '',
        last_name: '',
        email: '',
        message: ''

    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const key = event.target.name
        const value = event.target.value
        setContactData(prevContactData => { return {...prevContactData, [key]: value }})
    }

    const submitFormContact = async () => {
        await axios.post(`${apiUrl}/contact`, contactData)
        setButtonFormState({ text: 'Enviado', disabled: !buttonFormState.disabled })
    }

    return (
        <>
            <Card className='w-11/12 md:w-max' variant='ghost'>
                <Flex direction='column' justify='center' gap='3'>
                    <Text className='text-3xl mb-4 text-white' as='p'>Contate-me</Text>
                    
                    <Flex justify='between' gap='3'>
                        <TextField.Input onChange={handleChange} placeholder='Nome' name='name' />
                        <TextField.Input onChange={handleChange} placeholder='Sobrenome' name='last_name' />
                    </Flex>

                    <TextField.Input onChange={handleChange} placeholder='Email' name='email' type='email' />
                    <TextArea onChange={handleChange} placeholder='Mensagem' name='message' />

                    <Flex direction='column' gap='2'>
                        <Button className='w-full' onClick={submitFormContact} color='gray' size='3' disabled={buttonFormState.disabled}>
                            {buttonFormState.text}
                        </Button>

                        <Flex gap='2'>
                            <Link className='w-1/2' href='https://wa.me/message/GIRAZSPEDZSXE1' target='_blank'>
                                <Button className='flex items-center w-full' color='grass' size='3'>
                                    <FaWhatsapp className='text-xl' />Whatsapp
                                </Button>
                            </Link>
                            <Link className='w-1/2' href='https://discord.com/users/1127594477536694332' target='_blank'>
                                <Button className='flex items-center w-full' color='indigo' size='3'>
                                    <FaDiscord className='text-xl' />Discord
                                </Button>
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>     
        </>
    )
}