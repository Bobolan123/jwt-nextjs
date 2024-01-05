import NextAuth from "next-auth/next";


export const {auth, handlers:{GET, POST}} = NextAuth({
    providers: {
        
    }
})