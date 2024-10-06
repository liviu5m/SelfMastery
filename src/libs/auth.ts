import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<{ id: string; name: string; email: string } | null> {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const dbUser = await prisma.user.findFirst({
          where: { email: credentials.email },
        });
        const isValidPassword = await bcrypt.compare(
          credentials.password ?? "",
          dbUser?.password ?? ""
        );

        if (isValidPassword) {
          console.log(dbUser);
          return {
            id: dbUser?.id?.toString() ?? "",
            name: dbUser?.username ?? "",
            email: dbUser?.id?.toString() ?? "",
          };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  },
};

export async function loginIsRequiredServer() {
  const session: { id: number | null } | null = await getServerSession(
    authConfig
  );
  console.log(session);

  if (session) return redirect("/");
}
export async function loginIsRequired() {
  const session: { id: number | null } | null = await getServerSession(
    authConfig
  );

  if (!session) return redirect("/");
}
