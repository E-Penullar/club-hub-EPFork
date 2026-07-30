import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    // 为了 M2 阶段方便测试，我们使用账号密码登录
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@hawaii.edu" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        // 在真实项目中这里需要对比加密后的密码，M2 阶段为了快速测试 RBAC，我们假定任何在数据库中存在的 email 都允许登入
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (user) {
          return user;
        }
        return null;
      }






    })
  ],
  callbacks: {
    // 将数据库中的 role 注入到 JWT token 中
    async jwt({ token, user }) {
      if (user) {
      const customUser = user as { id: string; role: string };
        token.role = customUser.role;
        token.id = customUser.id;
             }
      return token;
    },
    // 将 token 中的 role 注入到前端可以读取的 session 中
    async session({ session, token }) {
      if (session.user) {
        const sessionUser = session.user as { role?: string; id?: string };
        sessionUser.role = token.role as string;
        sessionUser.id = token.id as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };