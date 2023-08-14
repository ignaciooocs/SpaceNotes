'use client'

import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { signIn, useSession} from 'next-auth/react'
import { redirect } from "next/navigation"

const SignIn = () => {
  const [error, seterror] = useState('')
  const [input, setinput] = useState({
    email: '',
    password: ''
  })

  const session = useSession()

  if (session.status === 'loading') {
    return null
  }

  if (session.status !== 'unauthenticated') {
    redirect('/')
  }


  const { email, password } = input

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setinput({ ...input, [name]: value})
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const res = await signIn('credentials', {
      email, password, redirect: false
    })

    if (res?.error) return seterror(res.error)
  }
    
  return (
    <div className="flex justify-center items-center">
      <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        {error ? (<div className="text-red-500 font-bold">{error}</div>) : null}
        <input type="email" placeholder="email" name="email" value={email} onChange={handleChange} />
        <input type="password" placeholder="password" name="password" value={password} onChange={handleChange} />
        <button type="submit">Enviar</button>
      </form>
      <button onClick={() => signIn('github')} className="p-3 rounded-md bg-blue-500 text-white font-bold">Github</button>
      <button onClick={() => signIn('google')} className="p-3 rounded-md bg-blue-500 text-white font-bold">Google</button>
    </div>
  )
}

export default SignIn