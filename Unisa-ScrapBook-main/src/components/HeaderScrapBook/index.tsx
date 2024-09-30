import {useSession, signOut} from 'next-auth/react'

import * as H from './styles'
import Link from 'next/link';


import {RiArrowGoBackFill} from 'react-icons/ri'
import {IoMdExit} from 'react-icons/io'

import {useEffect, useState} from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/pages/api/services/firebaseConection';

interface HeaderProps{
    id: string;
}

export default function HeaderScrapBook({id}: HeaderProps){
    const{data: session, status} = useSession();

    const [photo, setPhoto] = useState<string>('')
    const [name, setName] = useState<string>('')

    useEffect(()=>{
       async function loadPhoto(){
        let docRef = doc(db, 'ScrapBooks', id)
        const snapshot: any = await getDoc(docRef);
        setPhoto(snapshot.data().foto)
        setName(snapshot.data().scrapname)
       }
       loadPhoto()
    },[])

    return(
        <>
        {session &&(
            <H.Header>
                <H.Container>
                    <div className='group'>
                        <Link href="/">
                            <RiArrowGoBackFill color='#c21717' size={35}/>
                            
                        </Link>
                    
                        <H.Title>
                            {photo != '' &&(
                                <>
                                    <img src={photo} alt=""/>
                                    {name}
                                </>
                            )}
                            
                        </H.Title>
                    </div>
                    
                    <H.Infos>
                        <p><strong>{session?.user?.name}</strong></p>
                        <img src={session?.user?.image as string} alt={session?.user?.name as string}/>
                    </H.Infos>
                </H.Container>
        </H.Header>
        )}
        </>
    )
}

