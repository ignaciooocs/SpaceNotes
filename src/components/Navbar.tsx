import Link from 'next/link'
import Auth from './Auth'

export default async function Navbar () {
  return (
    <header className='flex justify-between border-2'>
      <nav className='flex gap-4 p-8'>
        <Link href='/'>Home</Link>
        <Link href='/profile'>Profile</Link>
      </nav>
      <div className='flex items-center gap-4'>
       <Auth />
      </div>
    </header>
  )
}