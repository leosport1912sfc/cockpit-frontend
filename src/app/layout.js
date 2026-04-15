import 'bootstrap/dist/css/bootstrap.min.css';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cockpit de Gestão de Frota",
  description: "Criado pelo Núcleo de Dados do DETRAN-MG",
};

export default function RootLayout({ children }) {
  return (
    // Adicionamos o data-scroll-behavior="smooth" aqui no html!
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
