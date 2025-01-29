import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { users, accounts, sessions } from "./drizzle/schema/users";
import { db } from "./drizzle/db";
//import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }),
  providers: [Google],
  callbacks: {
    async signIn({}) {
      try {
        return true;
      } catch (error) {
        console.error("Error checking user or saving to DB", error);
        return false;
      }
    },
  },
});
