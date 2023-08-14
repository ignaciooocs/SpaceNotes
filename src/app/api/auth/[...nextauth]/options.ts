import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/models/user'

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        }

        const res = await fetch("http://localhost:3000/api/auth/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const user = await res.json();

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        const { name, email, id: googleId, image } = user    
  
          try {
            const userFound = await User.findOne({ email})
            if (!userFound) {
              const res = await fetch('http://localhost:3000/api/auth/sign-up', {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email,
                  name,
                  image,
                  googleId
                })
              })
    
              console.log(res)
            }
          } catch (error) {
            console.log('Ocurrio un error en al insertar un usuario de google')
          }
        
        return user
      }
      if (account?.provider === 'credentials') {
        console.log(user, 'credentials')
        return user
      }
    },
    async session ({session, token}){
      console.log(session, token)
      return session
    }
  },
}