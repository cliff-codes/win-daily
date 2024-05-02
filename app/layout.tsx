import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/utility/NavBar";
import Footer from "@/components/customUi/Footer";

const inter = Poppins({ 
  weight: ["300", "400", "500"], 
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Win Daily",
  description: "Win Daily web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen bg-slate-200 flex flex-col justify-between`}>
        <NavBar/>
        <div className="flex-grow">
        {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
