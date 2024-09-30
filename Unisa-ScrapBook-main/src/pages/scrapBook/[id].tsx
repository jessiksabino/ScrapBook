import { GetServerSideProps } from "next"
import Image from "next/image"
import {useEffect, ChangeEvent, useState, FormEvent} from 'react'

import {FaTrash} from 'react-icons/fa'
import {IoSend} from 'react-icons/io5'
import {AiOutlineLoading3Quarters, AiOutlinePaperClip} from 'react-icons/ai'
import{
    doc,
    collection,
    query,
    where,
    getDoc,
    addDoc,
    getDocs,
    deleteDoc,
    orderBy,
    onSnapshot,
}
from 'firebase/firestore'
import { db, storage } from "@/pages/api/services/firebaseConection";
import { getSession } from "next-auth/react";
import { Console } from "console";
import Head from "next/head";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage"

interface ScrapProps{
    scrap:{
        id: string;
        name: string;
        owner:string
    }
    user:{
        name: string;
        email: string;
        image: string;
    }
}
interface CardsProps{
    id: string;
    name: string;
    imagemURL: string;
    mensagem: string;
    scrapID: string;
    created: string;
}

import * as S from '../../styles/stylesScrapBook'
import Modal from "@/components/modal"

export default function ScrapBook({scrap, user} :ScrapProps){
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('');
    const [blockInput, setBlockInput] = useState(false);

    const [cards, setCards] = useState<CardsProps[]>([]);

    const [texto, setTexto] = useState('');
    const [progress, setProgress] = useState(0);

    const [visibledelete, setVisibledelete] = useState(false)
    const [idDelete, setIdDelete] = useState('')

    useEffect(()=>{
        async function loadCards() {
            const cardRef = collection(db , 'chats')
            const q = query(
                cardRef,
                orderBy('created', 'desc'),
                where("scrapID", "==", scrap.id)
            )
            onSnapshot(q, (snapshot)=>{
                let lista = [] as CardsProps[];

                snapshot.forEach((doc)=>{
                    let data = doc.data()?.created.seconds * 1000;
                    let dateHora: string = new Date(data).toLocaleDateString() + ' - '+ new Date(data).toLocaleTimeString() 
                    lista.push({
                        id: doc.id,
                        name: doc.data().name,
                        imagemURL: doc.data().imagemURL,
                        mensagem:  doc.data().mensagem,
                        scrapID:  doc.data().scrapID,
                        created:  dateHora,
                    })
                })
                setCards(lista);
            })
        }
        loadCards();
    },[user?.email])

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile: File | any = event.target.files?.[0] || null;
        const fileName: File | any = event.target.files?.[0].name || null;
        if(fileName)setFileName(fileName);
        
        
        setFile(selectedFile);
        // Restante do seu código...
      };

    async function handleRegisterChat(event: FormEvent){
        event.preventDefault();
        
        if(!file){alert('Insira uma foto');return}
        if(texto.trim() == ''){alert('Insira um texto');return}
        if(texto.trim().length > 25){alert('O texto tem que ter até de 25 caracteres');return}
        setBlockInput(true)
        const storageRef = ref(storage, `images/${file.name}`)
        const uploadImg = uploadBytesResumable(storageRef, file)
        await uploadImg.on(
            'state_changed',
            snapshot =>{
                const progresso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progresso)
            },
            error=>{
                alert(error)
            },
            ()=>{
                getDownloadURL(uploadImg.snapshot.ref).then(url=>{
                    newMessage(url)
                })
            }
        )
      }
      async function newMessage(fotoUrl: string){
            try{
                await addDoc(collection(db, 'chats'),{
                    name: user.name,
                    imagemURL: fotoUrl,
                    mensagem: texto,
                    scrapID: scrap.id,
                    created: new Date,
                })
                setFile(null)
                setTexto('')
                setProgress(0)
                setFileName('')
                setBlockInput(false)
            }catch(err){
                console.log(err)
            }
      }

      async function handleDeleteMessage(id: string){
        if(!id)return;

        const docRef = doc(db, 'chats', id)
        await deleteDoc(docRef)
        setVisibledelete(false)
      }
      function handleVisibleDelete(id: string){
        if(id === '')return;
        setIdDelete(id)
        setVisibledelete(true)
      }
    return(
        <>
        <Head>
            <title>Scrap - {scrap.name}</title>
        </Head>
        <S.Container>
            <S.Content>
                <S.Chat>
                    {cards.map((item)=>(
                         <S.SingleCard 
                            key={item.id} 
                            style={{justifyContent: item.name == user.name ? 'right' : 'left'}}
                            >
                            <div className="messageContent">
                                    <div className="trashCont">
                                    { (item.name === user.name || user.email === scrap.owner) &&(
                                        <FaTrash 
                                        size={20} 
                                        color="#c21717" 
                                        onClick={()=>handleVisibleDelete(item.id)}/>
                                    )}
                                        
                                        <p className="date">{item.created}</p>
                                    </div>                            
                                <img src={item.imagemURL} alt={item.id}/>
                                <p>{item.mensagem}</p>
                                {item.name === user.name ?(
                                    <p style={{color:'#c21717'}} className="name">{item.name}</p>
                                ):(
                                    <p className="name">{item.name}</p>
                                )}
                                
                            </div>
                        </S.SingleCard>
                    ))}
                    
                </S.Chat>
                <S.Form onSubmit={handleRegisterChat}>
                    {progress > 0 &&(
                        <S.Progress>
                            <div className="progress" style={{width: `${progress}%`}}></div>
                        </S.Progress>
                    )}
                    
                    <input 
                        type="text" 
                        placeholder="Escreva sua descrição"
                        value={texto}
                        onChange={(e: ChangeEvent<HTMLInputElement>)=>{setTexto(e.target.value)}}
                        disabled={blockInput}
                    />
                    <div className="file">
                        {fileName &&(
                            <p>{fileName}</p>
                        )}
                        <label htmlFor="arquivo"><AiOutlinePaperClip size={30} color="#c21717"/></label>
                        <input disabled={blockInput} type="file" name="arquivo" id="arquivo"  accept="image/*" onChange={handleFileChange}/>
                    </div>
                    <button type="submit"  disabled={blockInput}>
                        {blockInput ?(
                            <AiOutlineLoading3Quarters size={30} color="#c21717"/>
                        ): (
                            <IoSend size={30} color="#c21717"/>
                        )}
                    </button>
                </S.Form>
                {visibledelete &&( 
                    <Modal texto="Deseja Remover essa foto?" handleVisible={()=>setVisibledelete(false)} handleDelete={()=>handleDeleteMessage(idDelete)}/>
                )}
            </S.Content>
        </S.Container>
        
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async({params, req}) =>{
    const session = await getSession({req})
    const email = session?.user?.email
    const id = params?.id as string;
    
    const docRef = doc(db, "ScrapBooks", id)
    const snapshot: any = await getDoc(docRef);
    if(snapshot.data() === undefined){
        return{
            redirect:{
                destination: '/',
                permanent: false,
            }
        }
    }
    const users: string[] = snapshot.data().email;
    const nameScrap = snapshot.data().scrapname
    const owner = snapshot.data().owner
    const vec: string[] = users.filter((e)=> e != email)
    if(vec.length == users.length){
        return{
            redirect:{
                destination: '/',
                permanent:false
            }
        }
    }

    return{
        props:{
            scrap:{
                id: id,
                name: nameScrap,
                owner: owner 
            },
            user: session?.user
        }
    }
}