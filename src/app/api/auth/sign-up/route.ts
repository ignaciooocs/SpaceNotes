import startDb from "@/libs/database"
import User from "@/models/user"
import { NextResponse } from "next/server"

interface NewUserRequest {
  name: string
  email: string
  password: string
}

interface NewUserResponse {
  id: string
  name: string
  email: string
}

type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string}>

export const POST = async (req: Request): Promise<NewResponse> => {
  const body = (await req.json()) as NewUserRequest

  await startDb()

  const oldUser = await User.findOne({ email: body.email })
  if (oldUser) 
    return NextResponse.json(
      { error: 'el email ya esta en uso' },
      { status: 422 }
      )
  
  const user = await User.create({ ...body })
  return NextResponse.json({
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name
    }
  })
}