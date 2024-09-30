import { db, storage } from "@/pages/api/services/firebaseConection"
import { doc, getDoc, addDoc, collection, updateDoc, deleteDoc, query, where, getDocs } from "firebase/firestore"
import { GetServerSideProps } from "next"
import { useRouter } from 'next/navigation'
import { getSession } from "next-auth/react"
import Head from "next/head"
import * as E from '../../styles/stylesEdit'

import {AiFillCloseCircle, AiFillCloseSquare, AiOutlineClose, AiOutlineLoading3Quarters} from 'react-icons/ai'

import {FormEvent ,useState, ChangeEvent} from 'react'
import React from 'react';

import { uploadBytesResumable, ref, getDownloadURL, deleteObject } from "firebase/storage"
import { FaRemoveFormat, FaTrash } from "react-icons/fa"
import { BsTrash, BsTrash2, BsTrash2Fill } from "react-icons/bs"

interface ScrapProps{
    scrap:{
        id: string;
        foto: string;
        email: string[];
        scrapname: string;
        password: string;
        users: string[];
    }
    user:{
        name: string;
        email: string;
        image: string;
    }
}

export default function Edit({scrap, user}: ScrapProps){
    const router = useRouter();

    const [newNameScrap, setNewNameScrap] = useState<string>(scrap.scrapname)
    const [newPassword, setNewPassword] = useState<string>(scrap.password)
    const [newFile, setNewFile] = useState<File | null>(null);
    const [newImageUrl, setNewImageUrl] = useState(scrap.foto);
    const [progressBar, setProgressBar] = useState(0);
    const [blockInput, setBlockInput] = useState(false);
    const [users, setUsers] = useState<string[]>(scrap.users)

    const [visibleDelete, setVisibleDelete] = useState(false)

    function handleChangeName(e:ChangeEvent<HTMLInputElement>){
        let tam: string = e.target.value
        tam = tam.trim()
        if(tam.length >= 16){
            alert('Nome tem que ter no maximo 15 caracteres!')
            return;
        }
        setNewNameScrap(e.target.value)
    }   
    function handleChangePassword(e:ChangeEvent<HTMLInputElement>){
        let tam: string = e.target.value
        tam = tam.trim()
        if(tam.length >= 16){
            alert('Senha tem que ter no maximo 15 caracteres!')
            return;
        }

        setNewPassword(e.target.value)

    }
    function handleFileChange(event: ChangeEvent<HTMLInputElement>){
        const selectedFile: File | any = event.target.files?.[0] || null; 
        setNewFile(selectedFile)
    }

    async function handleChangeInfosScrapBook(event: FormEvent){
        event.preventDefault();
        if(newNameScrap.trim().length < 5){
            alert('Nome deve ser maior que 5 caracteres')
            return;
        }
        if(newPassword.trim().length < 5){
            alert('Senha deve ser maior que 5 caracteres')
            return;
        }
        setBlockInput(true)
        if(newFile){
            const storageRef = ref(storage, `images/${newFile?.name}`)
            const uploadFile = uploadBytesResumable(storageRef, newFile)
            uploadFile.on(
                'state_changed',
                snapshot =>{
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setProgressBar(progress)
                },
                error=>{
                    alert(error)
                }, ()=>{
                    getDownloadURL(uploadFile.snapshot.ref).then(url=>{
                        setNewImageUrl(url)
                        EditScrap(url)
                    })
                }
            )
        }else{
            EditScrap()
        }  
    }   
    async function EditScrap(fotoUrl?: string){
        const scrapRef = doc(db, "ScrapBooks", scrap.id);

        try{
            await updateDoc(scrapRef,{
                scrapname: newNameScrap,
                password: newPassword,
                foto: fotoUrl ? fotoUrl : newImageUrl,
                email: users
            })
            router.push('/home')
        }catch(err){
            console.log(err)
        }
        
    }
    function handleDeleteUser(id: number){
        let name = users[id]
        let newUsers = users.filter(e=> e != name)
        setUsers(newUsers)
    }
    async function handleDeleteScrapbook(){
        if(!scrap.id)return;

        const itemsQuery = query(collection(db, 'chats'), where('scrapID', '==' , scrap.id))
        const chats = await getDocs(itemsQuery);
        const itemDeletionPromises = []

        chats.forEach(async (chatSingle)=>{
            
            const image = chatSingle.data().imagemURL
            console.log(image)
            if(image){
                const imageUsageQuery = query(collection(db, 'chats'), where('imagemURL', '==', image));
                const imageUsageDocs = await getDocs(imageUsageQuery);
                
                console.log(imageUsageDocs)
                console.log(imageUsageDocs.size)
                if (imageUsageDocs.size === 1) {
                  // If there are no other items using this image, then delete it
                  const storageRef = ref(storage, image);
                  itemDeletionPromises.push(deleteObject(storageRef));
                  console.log('1 só')
                }
            }
            const chatRef = doc(db, 'chats', chatSingle.id);
            itemDeletionPromises.push(deleteDoc(chatRef))
            
        })
        const scrapbookDocRef = doc(db, 'ScrapBooks', scrap.id)
        itemDeletionPromises.push(deleteDoc(scrapbookDocRef))

        await Promise.all(itemDeletionPromises);

        router.push('/home')
    }
    return(
        <>
            <Head>
                <title>
                    Editando... - {scrap.scrapname}
                </title>
            </Head>
            <E.Container>
                <h1>Painel de Edição do {newNameScrap} 
                    <FaTrash size={30} color="#c21717" onClick={()=>setVisibleDelete(true)}/>
                </h1>
                <E.Form onSubmit={handleChangeInfosScrapBook}>
                    <label>Nome:</label>
                    <input
                        type="text" 
                        placeholder="Nome do ScrapBook..."
                        value={newNameScrap}
                        onChange={handleChangeName}
                     />
                     <label>Senha:</label>
                    <input
                        type="text" 
                        placeholder="Senha do ScrapBook..."
                        value={newPassword}
                        onChange={handleChangePassword}
                     />
                    <label>Foto atual:</label>
                    <div><img src={newImageUrl} alt={newNameScrap}/></div>
                    <label>Trocar Foto:</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        />
                        <label>Usuários em seu ScrapBook:</label>
                        <E.ListaUsers>
                            {users.map((e, index)=>(
                                <React.Fragment key={index}>
                                {e != user.email &&(
                                    <li key={index}>{e} 
                                    <AiOutlineClose size={25} onClick={()=>{handleDeleteUser(index)}}/>
                                    </li>
                                )}
                                </React.Fragment>
                            ))}
                        </E.ListaUsers>
                    <button disabled={blockInput} type="submit">
                        {blockInput ?(
                            <AiOutlineLoading3Quarters color="#0f0f0f" size={30}/>
                        ):(
                            'Aplicar alterações'
                        )}
                       
                        </button>
                    {<progress value={progressBar} max={100}/>}

                    {visibleDelete &&(
                        <E.BackModal>
                            <E.Modal>

                                <div>
                                    <h2>Certeza que deseja remover o scrapbook?</h2>
                                </div>
                                <div>
                                    <button onClick={handleDeleteScrapbook} className="yes">Apagar</button>
                                    <button onClick={()=>setVisibleDelete(false)} className="no">Cancelar</button>
                                </div>
                            </E.Modal>
                        </E.BackModal>
                    )}
                   
                </E.Form>
            </E.Container>

        </>
    )
}

export const getServerSideProps: GetServerSideProps = async({params, req}) =>{
    const session = await getSession({req})
    const email = session?.user?.email
    const id = params?.id as string;
    
    const docRef = doc(db, 'ScrapBooks', id)
    const snapshot: any = await getDoc(docRef);
    if(snapshot.data() === undefined){
        return{
            redirect:{
                destination: '/',
                permanent: false,
            }
        }
    }
    const owner: string = snapshot.data().owner;
    const itens: any = snapshot.data()
    const emails: string[] = snapshot.data().email

    if(owner != email){
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
                foto: itens.foto,
                email: itens.email,
                scrapname: itens.scrapname,
                password: itens.password,
                users: emails
            },
            user: session?.user
        }
    }
}