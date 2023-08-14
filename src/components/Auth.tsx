'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Auth () {

  const session = useSession()

  if (session.status === 'loading') return <div>Loading...</div>
  console.log(session)
  return (
    <>
     {!session.data 
          ? <>
              <Link href='/auth/sign-in'>Sign In</Link>
              <Link href='/auth/sign-up'>Sig Up</Link>
            </>
          : <button onClick={() => signOut()} className='rounded-md bg-red-500 text-white font-bold py-2 px-3'>Logout</button>
        }
    </>
  )
}