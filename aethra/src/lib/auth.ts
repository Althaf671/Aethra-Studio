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
      async authorize(credentials) {
        // Validate inputs
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // To find user already exist or not from db
        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          return null;
        }

        // Compare password at input and password from db
        const isPasswordValid = await compare(credentials.password, existingUser.password);
        if (!isPasswordValid) {
          return null;
        }

        // Return user info 
        return {
          id: `${existingUser.id}`,
          name: existingUser.name, 
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
    console.log(token, user);
      if(user) {
        return {
            ...token,
            name: user.name,
        }
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
            ...session.user,
            name: token.name
        }
      }
      return session;
    },
  }
};


