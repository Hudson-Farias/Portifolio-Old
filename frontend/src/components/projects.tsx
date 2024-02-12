import React from 'react'
import { Flex, Grid, ScrollArea, Card, Link, Text, Button } from '@radix-ui/themes'

import { FaRegWindowRestore, FaGithub } from 'react-icons/fa'

interface PropsI {
    repos?: {
      id: number,
      name: string,
      description: string | null,
      html_url: string | null,
      homepage: string | null
    }[]
  }
  

export default function Projects({ repos }: PropsI) {

    return (
        <>
            <Flex className='w-11/12'>
                <ScrollArea scrollbars='horizontal'>
                    <Grid className='w-max' rows='2' gap='5' flow='column'>
                        { repos?.map((repo, i) => { return (
                            <Card className='text-white w-56 bg-stone-600' variant='classic' key={i}>
                                <Flex className='w-full h-full' direction='column' gap='3' align='center'>
                                    <Flex className='w-11/12' align='center' justify='between'>
                                        <Text className='pt-3' size='2' weight='bold'>{repo.name}</Text>
                                        <Flex gap='2'>
                                            {repo?.homepage && <Link href={repo?.homepage} target='_blank' className='text-white'><FaRegWindowRestore /></Link>}
                                            
                                            <Link href={repo?.html_url || undefined} target='_blank' className='text-white'><FaGithub /></Link>
                                        </Flex>
                                    </Flex>
                                    <Text className='line-clamp-3 w-11/12'>{repo.description}</Text>
                                </Flex>
                            </Card>
                        )})}
                    </Grid>
                </ScrollArea>
            </Flex>
        </>
    )
}

//<Card className='text-white w-56 bg-stone-800 shadow-sm shadow-stone-800' variant='classic'>
