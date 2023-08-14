import startDb from '@/libs/database'
import User from '@/models/user'
import { NextResponse } from 'next/server'

export async function POST (req: Request) {
  try {
    const { email, password } = await req.json()
    await startDb()

    const user = await User.findOne({ email })
    if (!user) throw new Error('Email o contraseña incorrectos')

    const verifyPassword = await user.comparePassword(password)
    if (!verifyPassword) throw new Error('Email o contraseña incorrectos')

    const newUser = {
      email: user.email,
      name: user.name,
      id: user._id
    }
    console.log(newUser)
    return NextResponse.json(newUser)
  } catch (error) {
    console.log(error)
  }
}