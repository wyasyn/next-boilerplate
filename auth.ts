import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/db";
import type { Provider } from "next-auth/providers";
import { compare } from "bcryptjs";
import { signInSchema } from "./lib/zod";
import { getUserById } from "./app/actions/user";

const providers: Provider[] = [
  Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      const validatedFields = signInSchema.safeParse(credentials);
      if (validatedFields.success) {
        const { username, password } = validatedFields.data;

        const existingUser = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (!existingUser || !existingUser.password) {
          return null;
        }

        const passwordMatch = await compare(password, existingUser.password);

        if (!passwordMatch) {
          return null;
        }

        // return user object with the their profile data
        return existingUser;
      }
      return null;
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await prisma.user.findUnique({
    //     where: { id: user.id },
    //   });
    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }
    //   return true;
    // },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.username = token.username;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.image = token.image;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.username = existingUser.username;
      token.firstName = existingUser.firstName;
      token.lastName = existingUser.lastName;
      token.image = existingUser.images[0].url;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers,
});
