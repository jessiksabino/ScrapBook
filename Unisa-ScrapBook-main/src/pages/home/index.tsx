import {useSession} from 'next-auth/react'

import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"

import Link from 'next/link'
import * as H from '../../styles/stylesHome'
import { useState, useEffect } from "react"
import { db } from '@/pages/api/services/firebaseConection'

import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'

import {FaEdit} from 'react-icons/fa'

interface ScrapProps{
    id: string;
    created: Date;
    email: string;
    foto:string;
    name: string[];
    scrapname: string;
    owner: string;
}

  

export default function Home(){
    const{data: session} = useSession();

    const [scraps, setScraps] = useState<ScrapProps[]>([])

    useEffect(()=>{
        async function loadScraps(){
            if(!session?.user)return
            const scrapsRef = collection(db, "ScrapBooks")
            const q = query(
                scrapsRef,
                orderBy("created", "desc"),
                where("email", "array-contains", session?.user?.email)
            )
            onSnapshot(q, (snapshot)=>{
                let lista= [] as ScrapProps[];
                snapshot.forEach((doc)=>{
                    lista.push({
                        id: doc.id,
                        created: doc.data().created,
                        email: doc.data().email,
                        foto:doc.data().foto,
                        name: doc.data().name,
                        scrapname: doc.data().scrapname,  
                        owner:doc.data().owner
                    })
                })
                setScraps(lista)
            });
        }
        loadScraps()
    },[session?.user?.email])

    return(
        <>
            <Head>
                <title>Seu ScrapBook Online</title>
            </Head>
           <H.Container>
                <H.Content>
                {scraps.map((item: ScrapProps) => (
            
                <H.ScrapbookSingle key={item.id} id={item.id}>
                        <Link href={`/scrapBook/${item.id}`}>
                            <img src={item.foto} alt="scrapBook" />
                        </Link>
                    
                        <H.InfosGP>
                        <h2>{item.scrapname}</h2>
                        <H.Membros>
                            {item.name[0] === session?.user?.name ?(
                                 <li style={{color:'#c21717'}}>{item.name[0]}</li>
                            ):(
                                 <li>{item.name[0]}</li>
                            )}
                           
                        </H.Membros>
                       
                        </H.InfosGP>
                        {session?.user?.email == item.owner &&(
                            <Link href={`/edit/${item.id}`} className='edit'>
                                <FaEdit size={30} color='#fafafa'/>
                            </Link>
                        )}
                     
                    
                </H.ScrapbookSingle>
                ))}

                    
                </H.Content>

                <H.BtnCriar href="/create">
                    Crie em um ScrapBook
                </H.BtnCriar>
                <H.BtnCriar href="/search">
                    Buscar ScrapBook
                </H.BtnCriar>
           </H.Container>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async({ req })=>{
    const session = await getSession({req})

    if(!session?.user){
        return{
            redirect:{
                destination: '/',
                permanent:false
            }
        }
    }
    return{
        props:{
          
        }
    }
}