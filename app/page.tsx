import Features from "@/components/customUi/Features";
import Showcase from "@/components/customUi/Showcase";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await getServerSession()
  if(session){
    redirect("/dashboard/streaks")
  }
  
  return (
    <main className="flex flex-col place-items-center">
      <Showcase/>
      <Features/>
    </main>
  );
}
