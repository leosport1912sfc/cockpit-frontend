import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credenciais Próprias',
      credentials: {
        email: { label: "E-mail Institucional", type: "email", placeholder: "servidor@transito.mg.gov.br" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials, req) {
        // Nosso "Cofre" temporário. Se o e-mail e a senha baterem, ele entra!
        // No futuro, isso aqui vai fazer uma pergunta lá pro nosso Node.js
        if (credentials.email === "admin@transito.mg.gov.br" && credentials.password === "123456") {
          return { 
            id: "1", 
            name: "Administrador da Frota", 
            email: "admin@transito.mg.gov.br" 
          };
        }
        
        // Se a senha estiver errada, barrado no baile!
        return null;
      }
    })
  ],
  pages: {
    signIn: '/', // Avisa que a nossa tela inicial (page.js) é a tela de login
  },
  // O segredo do nosso coração (não precisa mais do arquivo .env.local por enquanto)
  secret: "uma_senha_muito_louca_e_romantica_do_nosso_cockpit", 
});

export { handler as GET, handler as POST };