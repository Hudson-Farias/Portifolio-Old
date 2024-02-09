import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, Flex, Link, Text, TextField, TextArea, Button } from '@radix-ui/themes'

import { FaWhatsapp, FaDiscord } from 'react-icons/fa'

import { API } from '@/api'

interface PropsI {
    urls?: {
        whatssap: string,
        discord: string
    }
}

const contactSchema = z.object({
    name: z.string(),
    last_name: z.string(),
    email: z.string().email({ message: 'Email inválido' }),
    message: z.string()
})

type ContactSchema = z.infer<typeof contactSchema>

export default function Contact({ urls }: PropsI) {
    const { register, handleSubmit } = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema)
    })

    const [isToastVisible, setToastVisible] = useState(false)

    const submitFormContact = async (data: ContactSchema) => {
        await API.post('/contact', data)

        setToastVisible(true)
        setTimeout(() => {
            setToastVisible(false);
        }, 10000)
    }

    return (
        <>
            <Card className='w-11/12 md:w-max' variant='ghost'>
                <form onSubmit={handleSubmit(submitFormContact)}>
                    <Flex direction='column' justify='center' gap='3'>
                        <Text className='text-3xl mb-4 text-white' as='p'>Contate-me</Text>
                    
                        <Flex justify='between' gap='3'>
                            <TextField.Input placeholder='Nome' {...register('name')} required />
                            <TextField.Input placeholder='Sobrenome' {...register('last_name')} required />
                        </Flex>
                        <TextField.Input placeholder='Email' {...register('email')} type='email' required />
                        <TextArea placeholder='Mensagem' {...register('message')} required />
                        <Flex direction='column' gap='2'>
                            <Button className='w-full bg-gray-100' size='3' type='submit'>
                                <Text className='text-gray-900'>Enviar</Text>
                            </Button>
                            <Flex gap='2'>
                                <Link className='w-1/2' href={urls?.whatssap} target='_blank'>
                                    <Button className='flex items-center w-full' color='grass' size='3'>
                                        <FaWhatsapp className='text-xl' />Whatsapp
                                    </Button>
                                </Link>
                                <Link className='w-1/2' href={urls?.discord} target='_blank'>
                                    <Button className='flex items-center w-full' color='indigo' size='3'>
                                        <FaDiscord className='text-xl' />Discord
                                    </Button>
                                </Link>
                            </Flex>
                        </Flex>
                    </Flex>
                </form>
            </Card>

            <Card className={`absolute bottom-0 mb-3 ${isToastVisible ? '' : 'hidden'}`} variant='ghost'>
                <Text className='text-white'>Enviado</Text>
            </Card> 
        </>
    )
}