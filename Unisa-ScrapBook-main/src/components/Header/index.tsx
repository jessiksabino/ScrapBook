import {useSession, signOut} from 'next-auth/react'

import * as H from './styles'
import Link from 'next/link';

import {IoMdExit} from 'react-icons/io'

export default function Header(){
    const{data: session, status} = useSession();
    return(
        <>
        {session &&(
            <H.Header>
                <H.Container>
                    <Link href="/">
                        <H.Title>
                            ScrapBook <span>Online</span>
                        </H.Title>
                    </Link>
                    <H.Infos>
                        <p><strong>{session?.user?.name}</strong></p>
                        <img src={session?.user?.image as string} alt={session?.user?.name as string}/>
                        <button onClick={()=>signOut()}><IoMdExit color='#c21717' size={35}/></button>
                    </H.Infos>
                </H.Container>
        </H.Header>
        )}
        </>
    )
}

