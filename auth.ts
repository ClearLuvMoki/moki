// import authConfig from "./auth.config"
// import { db } from "@/server/db"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import type { NextAuthOptions } from "next-auth"
// import NextAuth from "next-auth"
//
//
// export const config = {
//     adapter: PrismaAdapter(db),
//     session: { strategy: "jwt" },
//     basePath: "/api/auth",
//     secret: process.env.AUTH_SECRET!,
//     pages: {
//         error: "/auth/error",
//     },
//     callbacks: {
//         async session({ token, session }) {
//             // if (token.sub && session.user) {
//             //     session.user = token.sub
//             // }
//             return session
//         },
//     },
//     ...authConfig,
// } satisfies NextAuthOptions
//
// export const {
//     handlers: { GET, POST },
//     auth,
//     signIn,
//     signOut,
// } = NextAuth(config)
