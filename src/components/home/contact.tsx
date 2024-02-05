import React, { useState } from 'react'
import { Card, Typography, Input, Button } from '@material-tailwind/react'

export default function Contact() {
    const [contactData, setContactData] = useState({
        name: '',
        last_name: '',
        email: '',
        message: ''

    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.name
        const value = event.target.value
        setContactData(prevContactData => { return {...prevContactData, [key]: value }})
    }

    return (
        <>
            <Card className='flex flex-col gap-8 px-10 pt-10 pb-5 bg-transparent shadow-none' placeholder>
                <Typography className='text-white mb-7' variant='h2' placeholder >Contate-me</Typography>
                
                <div className='flex flex-row gap-3'>
                    <Input onChange={handleChange} name='name' variant='static' label='Nome' size='md' color='white' crossOrigin />
                    <Input onChange={handleChange} name='last_name' variant='static' label='Sobrenome' size='md' color='white' crossOrigin />
                </div>
                <Input onChange={handleChange} name='email' variant='static' label='Email' type='email' color='white' crossOrigin />
                <Input onChange={handleChange} name='message' variant='static' label='Mensagem' color='white' crossOrigin />

                <Button onClick={() => console.log(contactData)} color='white' disabled placeholder>Enviar</Button>
            </Card>     
        </>
    )
}