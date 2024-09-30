import {Container, Title, LoginBtn} from '../styles/styles'
import {signIn, signOut} from 'next-auth/react'

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'


import { GetServerSideProps } from 'next'
import {getSession} from 'next-auth/react'
//import * as H from '../styles/styles'


interface HomeProps{
  user:{
    email: string;
    name: string;
  }
}

export default function Home({user}: HomeProps) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="ScrapBook Online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="scrapbook, Scrap Book, ScrapBook, Scrapbook, ScrapBook, ScrapBook Online, Scrapbook online, scrapbook online"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Container>
          <Title>Seu Scrapbook Online</Title>
            <LoginBtn onClick={()=>signIn("google")}>
              crie o seu agora!
            </LoginBtn>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async({ req })=>{
  const session = await getSession({req})

  if(session?.user){
      return{
          redirect:{
              destination: '/home',
              permanent:false
          }
      }
  }
  return{
    props:{
       
    }
  }
}
