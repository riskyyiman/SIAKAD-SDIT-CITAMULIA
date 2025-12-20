import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // DATA TESTING (Nanti ganti dengan query Prisma)
        const users = [
          { id: '1', name: 'Admin TU', username: 'admin', password: '123', role: 'Admin' },
          { id: '2', name: 'Pak Guru', username: 'guru', password: '123', role: 'Guru' },
          { id: '3', name: 'Ibu Wali', username: 'wali', password: '123', role: 'Wali' },
        ];

        const user = users.find((u) => u.username === credentials?.username && u.password === credentials?.password);

        if (user) {
          return { id: user.id, name: user.name, role: user.role };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // Memasukkan role ke dalam Token
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    // Memasukkan role dari Token ke dalam Session agar bisa dibaca di Frontend
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
