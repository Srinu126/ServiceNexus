import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { users, accounts, sessions } from "./drizzle/schema/users";
import { db } from "./drizzle/db";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }),
  providers: [Google],
  trustHost: true,
  callbacks: {
    async signIn({}) {
      try {
        return true;
      } catch (error) {
        console.error("Error checking user or saving to DB", error);
        return false;
      }
    },
    async session({ session }) {
      const userFromDb = await db
        .select()
        .from(users)
        .where(eq(users.email,session.user.email))
        .execute();

      if (userFromDb) {
        session.user.phone = userFromDb[0].phone;
      }
      return session;
    },
  },
});
