import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/components/AuthProvider/AuthProvider";


const roboto = Roboto({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub – your smart notebook for notes, tasks and ideas',
  openGraph: {
    title: 'NoteHub',
    description: 'NoteHub – a simple app for writing notes',
    url: 'https://08-zustand-tawny.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub App',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <div>
          <TanStackProvider>
            <AuthProvider>
            <Header />
            <main className="main">
              {children}
              {modal}
            </main>
            <Footer />
            </AuthProvider>
          </TanStackProvider>
        </div>
      </body>
    </html>
  );
}

