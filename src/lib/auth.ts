import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import db from "./db";
import bcrypt from "bcryptjs";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

async function getUserByEmail(email: string) {
  return await db.user.findUnique({ where: { email } });
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const validatedFields = authSchema.safeParse(credentials);

          if (validatedFields.success) {
            const { email, password } = validatedFields.data;

            const user = await getUserByEmail(email);

            if (!user || !user.password) return null;

            const passwordsMatch = await bcrypt.compare(
              password,
              user.password
            );

            if (passwordsMatch)
              return {
                id: String(user.id),
                email: user.email,
                name: user.name,
                image: user.email,
              };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
