import { AuthOptions } from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcryptjs";



{/* ============ THIS CODE IS FROM NEXT.AUTH/PROVIDER/CREDENTIALS - 
just copy and modify it because they provide this ========= */}



export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", 
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string } | undefined) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Email or password is wrong");
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          console.log("No user found with this email");
          return null;
        }

        const isPasswordValid = await compare(credentials.password, existingUser.password);
        if (!isPasswordValid) {
          console.log("Password incorrect");
          return null;
        }

        console.log("User authentication successful for:", existingUser);

        return {
          id: existingUser.id.toString(),
          name: existingUser.name,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
  },
};


