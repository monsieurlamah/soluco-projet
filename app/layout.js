import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import Header from "./_components/Header";
import Provider from "./Provider";
import '@smastrom/react-rating/style.css'
import Footer from "./_components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Soluco - La solution numérique pour la construction",
  description:
    "Soluco : La solution numérique pour construire au Pays - Achetez les materiaux de construction de votre choix partout et à tout moment.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider localization={frFR}>
     
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
        <Footer/>
        </body>
    </html>
 
    </ClerkProvider>
  );
}
