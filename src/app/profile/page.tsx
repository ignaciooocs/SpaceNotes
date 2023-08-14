import { getServerSession } from 'next-auth/next'
import { redirect } from "next/navigation"
import Image from 'next/image'

export default async function Profile () {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth/sign-in?callbackUrl=/perfil')
}

const userImage = session.user?.image ? (
  <Image
      className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
      src={session.user?.image}
      width={200}
      height={200}
      alt={session.user?.name ?? "Profile Pic"}
      priority={true}
  />
) : null

  return (
    <div>
      Bienvenido a tu perfil {session.user?.name}
      {userImage}
    </div>
  )
}