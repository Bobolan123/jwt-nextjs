import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials:any) {
        const userAcc = {
          username: credentials.email,
          password: credentials.password,
        };
        
        const res = await fetch('http://localhost:3001/auth/login',{
          method: 'POST',
          body: JSON.stringify(userAcc),
          headers: {
            'content-type': 'application/json'
          }
        })
        const data = await res.json()
        
        if (data && data.access_token) {
          return data
        } else {
          null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({token, user}) {
      if (user) return {...token, ...user}

      return token
    }

  },  

  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;
