import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeclient } from "./sanity/lib/write-client"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub({
    clientId:process.env.GITHUB_CLIENT_ID as string,
    clientSecret:process.env.GITHUB_CLIENT_SECRET as string,
  })],
   session: {
    strategy: "jwt", // ensures jwt() gets called
  },
   callbacks: {
    async signIn({ user, profile }) {
      const id = profile?.id
      const login = profile?.login as string;
      const bio = profile?.bio as string | undefined;


      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

      if (!existingUser) {
        await writeclient.create({
          _type: "author",
          id,
          name: user.name,
          username: login,
          email: user.email,
          image: user.image,
          bio: bio ?? "",
        });
      }
      return true;
    },

   async jwt({ token, account,profile }) {
     if(account && profile) {
      const user=await client.withConfig({
        useCdn:false
      }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });
      if(user){
        token.id=user._id
      }
     }
      return token;
    },

  async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
  // Ensure you set this env var
  secret: process.env.AUTH_SECRET,
})