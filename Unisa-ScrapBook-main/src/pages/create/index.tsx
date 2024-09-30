import { useRouter } from 'next/navigation'
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import {addDoc, collection} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {AiOutlineLoading3Quarters} from 'react-icons/ai'

import {useSession} from 'next-auth/react'
import * as C from '../../styles/stylesCreate'
import { FormEvent, use, useState, ChangeEvent } from "react"

import { db, storage } from "@/pages/api/services/firebaseConection"

interface FileFormat{
    file:{
        lastModified: number;
        lastModifiedDate: Date;
        name: string;
        size: number;
        type: string;
        webkitRelativePath: string;
    }
}

export default function Create(){
    const{data: session} = useSession();
    const router = useRouter()


    const [scrapBookName, setScrapBookName] = useState('');
    const [progress, setProgress] = useState(0);
    const [imgUrl, setImgUrl] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [passwordS, setPasswordS] = useState('')

    const [blockInput, setBlockInput] = useState(false)
    
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile: File | any = event.target.files?.[0] || null;
        setFile(selectedFile);
        // Restante do seu código...
      };
    function handleChangeName(e:ChangeEvent<HTMLInputElement>){
        let tam: string = e.target.value
        tam = tam.trim()
        if(tam.length >= 16){
            alert('Nome tem que ter no maximo 15 caracteres!')
            return;
        }
        setScrapBookName(e.target.value)
    }   

    async function handleCreateScrapBook(event: FormEvent){
        event.preventDefault();
        if(scrapBookName.trim().length < 5){
            alert('O nome do ScrapBook tem que ser maior que 5 caracteres')
            return;
        }
        if(scrapBookName.trim.length >= 16){
            alert('O nome do ScrapBook tem que ser menor que 16 caracteres')
        }
        if(!file){
            alert('coloque uma foto para o grupo')
            return;
        }
        if(passwordS.trim().length < 5){
            alert('Coloque uma senha mais forte')
            return;
        }
        setBlockInput(true)

        const storageRef = ref(storage, `images/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        await uploadTask.on(
            "state_changed",
            snapshot =>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress)
            },
            error=>{
                alert(error)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(url =>{
                    setImgUrl(url)
                    newScrapBook(url)
                })
            }
        )
    
        
    }
    async function newScrapBook(fotoUrl:string) {
        try{
            await addDoc(collection(db, "ScrapBooks"),{
                scrapname:scrapBookName,
                created: new Date(),
                email: [session?.user?.email],
                name: [session?.user?.name],
                foto: fotoUrl,
                owner: session?.user?.email,
                password:passwordS
            });
            router.push('/home')
            
           }catch(err){
            console.log(err)
           }  
    }
      
    

    return(
        <>
            <Head>
                <title>Criando seu Scrab</title>
            </Head>
            <C.Container>
                <h1>Painel de criação</h1>
                <C.Form onSubmit={handleCreateScrapBook}>
                    <label>Nome:</label>
                    <input
                        type="text" 
                        placeholder="Nome do ScrapBook..."
                        value={scrapBookName}
                        onChange={handleChangeName}
                     />
                     <label>Senha:</label>
                     <input
                        type="text" 
                        placeholder="Senha do ScrapBook..."
                        value={passwordS}
                        onChange={(e)=>{setPasswordS(e.target.value)}}
                     />
                    <label>Foto</label>
                    <input type="file" accept="image/*" onChange={handleFileChange}/>
                    <button type="submit" disabled={blockInput}>
                        {blockInput ?(
                            <AiOutlineLoading3Quarters color="#0f0f0f" size={30}/>
                        ):(
                            ' Criar ScrapBook'
                        )}
                       
                    </button>
                    {<progress value={progress} max={100}/>}
                </C.Form>
            </C.Container>
           
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