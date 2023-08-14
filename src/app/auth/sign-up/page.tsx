'use client'

import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from "next/navigation"

const SignUp = () => {


  const session = useSession()

  if (session.status !== 'unauthenticated') {
    redirect('/')
  }

  const [input, setinput] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { name, email, password } = input

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setinput({ ...input, [name]: value})
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(input)
    }).then((res) => res.json())
    console.log(res)
  }
  return (
    <div className="flex justify-center items-center">
      <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <input placeholder="name" name="name" value={name} onChange={handleChange} />
        <input type="email" placeholder="email" name="email" value={email} onChange={handleChange} />
        <input type="password" placeholder="password" name="password" value={password} onChange={handleChange} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default SignUp