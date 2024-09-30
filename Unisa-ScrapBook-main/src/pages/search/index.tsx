import React from 'react';
import * as S from '../../styles/stylesSearch'
import Head from 'next/head'
import Link from 'next/link'
import {BsFillDoorOpenFill} from 'react-icons/bs'

import { useRouter } from 'next/navigation'

import {BsEyeSlashFill, BsEyeFill} from 'react-icons/bs'
import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'

import { getSession, useSession } from "next-auth/react"

import {useState, ChangeEvent, useEffect, FormEvent} from 'react'
import { GetServerSideProps } from 'next'
import { db } from '@/pages/api/services/firebaseConection'
import { and, collection, doc, getDoc, getDocs, or, orderBy, query, updateDoc, where } from 'firebase/firestore'

interface ScrapsProps{
   scraps: ScrapProp[];
}
interface ScrapProp{
    id: string;
    scrapname: string;
    foto: string;
    email: string;
}

export default function Search({scraps} :ScrapsProps){
    const{data: session, status} = useSession();
    const router = useRouter();

    const [scrapsSearch, setScrapsSearch] = useState('')
    const [scrapsArr, setScrapsArr] = useState<ScrapProp[]>(scraps)
    const [scrapsArrSearch, setScrapsArrSearch] = useState<ScrapProp[]>([]);
    const [visible, setVisible] = useState(false);
    const [nomeAss, setNomeAss] = useState('')
    const [visiblePassword, setVisiblePasswor] = useState(false);
    const [password, setPassword] = useState('');
    const [idScrap, setIdScrap] = useState('');

    useEffect(()=>{
        if(scrapsSearch.trim() == ""){
            setScrapsArrSearch(scrapsArr)
            return
        };
        async function searchScrap(){
            const scrapsRef = collection(db, "ScrapBooks")
            const q = query(
                scrapsRef,
                or( where('scrapname', '==', scrapsSearch),
                    where('id' ,'==', scrapsSearch)
                ),
                orderBy('created', 'desc'),  
            )
            const docSnap = await getDocs(q)
            let lista = [] as ScrapProp[]; 
           docSnap.forEach((e)=>{
            lista.push({
                id: e.id,
                scrapname: e.data().scrapname,
                foto: e.data().foto,
                email: e.data().email,
            })
           })
           if(lista.length == 1){
            setScrapsArrSearch(lista)
           }else{
            setScrapsArrSearch(scrapsArr)
           }
           
        }
        searchScrap()
        
    },[scrapsSearch])

    function handleSearch(e: ChangeEvent<HTMLInputElement>){
        setScrapsSearch(e.target.value)
    }
    function handleShowPainelAcess(id: string, nome: string){
        setVisible(true)
        setNomeAss(nome)
        setIdScrap(id)
    }
    async function handleEntrarScrap(event: FormEvent){
        event.preventDefault();
        if(password.trim() == '')return;

        const scrapsRef = doc(db, "ScrapBooks", idScrap)
        const docSnap = await getDoc(scrapsRef)
        let pass: any = docSnap.data()
        let email: string[] = pass.email
        let name: string[] = pass.name
        if(pass.password != password){
            alert('senha errada')
            return;
        }
        email.push(session?.user?.email as string)
        name.push(session?.user?.name as string)
        try{
            await updateDoc(scrapsRef, {
                email: email,
            })
            setVisible(false)
            router.push('/home')
        }catch(err){
            console.log(err)
        }
        
        


    }
    return(
        <>
            <Head>
                <title>Search ScrapBook</title>
            </Head>
            <S.Container>
                <S.Content>
                    <S.SearchContent>
                        <AiOutlineSearch size={30} color='#c21717'/>
                        <input 
                            type='text' 
                            placeholder='Digite o nome do scrapbook'
                            value={scrapsSearch}
                            onChange={handleSearch}
                            />
                    </S.SearchContent>
                    <S.ResultsContent>
                        {scrapsArrSearch.map((item: any)=>(
                            <React.Fragment key={item.id}>
                            {item.email.indexOf(session?.user?.email) == -1 &&(
                                 <S.ScrapbookSingle key={item.id}>
                            
                                 <img src={item.foto} alt={item.scrapname} />
                            
                                 <S.InfosGP>
                                     <h2>{item.scrapname}</h2>
                                     <S.Membros>
                                         <li>ID DO SCRAP: {item.id}</li>
                                     </S.Membros>
                                 </S.InfosGP>
                                 
                                    <a onClick={()=>handleShowPainelAcess(item.id, item.scrapname)} className='edit'>
                                        <p>Entrar</p>
                                        <BsFillDoorOpenFill size={30} color='#fafafa'/>
                                    </a>
                                     </S.ScrapbookSingle>
                            )}
                            
                         </React.Fragment>
                        ))}

                        {visible &&(
                            <S.PainelAcess>
                            <div className='content'>
                                <div className='iconContent'>
                                    <AiOutlineClose
                                        size={30} 
                                        color='#c21717'
                                        onClick={()=>setVisible(false)}
                                        />
                                </div>
                                <p>{nomeAss}</p>
                                <form onSubmit={handleEntrarScrap}>
                                    <div className='input-wrap'>
                                        <input 
                                            type={visiblePassword ? 'text': 'password'} 
                                            placeholder='Digite a senha...'
                                            value={password}
                                            onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                                                setPassword(e.target.value)
                                            }}
                                            />
                                    
                                        {visiblePassword ?(
                                            <BsEyeSlashFill 
                                                size={30} 
                                                color='#c21717'
                                                onClick={()=>setVisiblePasswor(false)}
                                                />
                                        ):(
                                            <BsEyeFill 
                                                size={30} 
                                                color='#c21717'
                                                onClick={()=>setVisiblePasswor(true)}
                                            />
                                        )}      
                                  </div>
                                  <button type='submit'>Entrar</button>
                                </form>
                            </div>
                        </S.PainelAcess>
                        )}
                        
                       
                    </S.ResultsContent>
                </S.Content>
            </S.Container>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async({req}) =>{
    const session = await getSession({req})

    if(!session?.user){
        return{
            redirect:{
                destination: '/',
                permanent:false
            }
        }
    }
        const scrapsRef = collection(db, "ScrapBooks")
        const q = query(
            scrapsRef,
            orderBy('created', 'asc')
        )
        const docSnap = await getDocs(q)
        let lista = [] as ScrapProp[];
        docSnap.forEach((doc)=>{
            lista.push({
                id: doc.id,
                scrapname: doc.data().scrapname,
                foto: doc.data().foto,
                email: doc.data().email
            })
        })
     
    return{
        props:{
          scraps: lista
        }
    }
}