
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// import { PrismaClient } from "@/app/generated/prisma";
import { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();  
import { prisma } from "./prisma";

type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
export const authOptions = {

  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },


      async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<User | null> {
        if (!credentials) return null;
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email
          }
        });


        if (!user) {
          throw new Error("No user found with this email");
        }


        console.log("user1", user);  
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          throw new Error("Incorrect password");
        }

        
        return {
          id: String(user.id),
          email: user.email,
        };
      },
    }),


    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),    
    
    

  ],
  
  secret: process.env.NEXTAUTH_SECRET || "fdre234",
  pages: {
    signIn: "/auth/login",    
  },

  session: { strategy: "jwt" as SessionStrategy },
  
  jwt: {
    maxAge: 60 * 60 * 24, 
  },

  callbacks: {

    //@ts-ignore
    async signIn({ user, account }) {
      console.log("user:", user);
      console.log("account:", account);
      if (account?.provider !== "credentials") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          return false;
        }
        user.id = existingUser.id;  
        user.name = existingUser.name;
      }
       
      return true;   
    },

    // async jwt({ token, user }: any) {
    //   console.log("user1", user);
    //   if (user) {
    //     console.log("user inside",user);
    //     token.id = user.id;
    //     token.name = user.name; 
    //     token.image = user.image; 
    //   }
    //   console.log("user", user);
    //   console.log("Token", token);  
    //   return token;  
    // },

  async jwt({ token, user, account }:any) {
  console.log("JWT callback - user:", user);
  console.log("JWT callback - token BEFORE:", token);
  console.log("JWT callback - account:", account);

  // Only run this logic during initial sign in
  if (account && token?.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email: token.email },
    });

    if (existingUser) {
      token.id = existingUser.id;
      token.name = existingUser.name;
    }
  }  

  console.log("JWT callback - token AFTER:", token);
  return token;
},

    async session({ session, token }: any) {
      if (session.user && token?.id) {
        session.user.id = token.id;
        session.user.name = token.name; 
        session.user.image = token.picture;  
      }
      console.log("session", session);
      return session;
    },
  },
};    