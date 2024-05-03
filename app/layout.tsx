import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/utility/NavBar";
import Footer from "@/components/customUi/Footer";
import SessionProvider from "./SessionProvider"
import { getServerSession } from "next-auth";

const inter = Poppins({ 
  weight: ["300", "400", "500"], 
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Win Daily",
  description: "Win Daily web application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession()

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={`${inter.className} h-screen bg-slate-200 flex flex-col justify-between`}>
          <NavBar/>
          <div className="flex-grow">
          {children}
          </div>
          <Footer/>
        </body>
      </SessionProvider>
    </html>
  );
}
