import Features from "@/components/customUi/Features";
import Showcase from "@/components/customUi/Showcase";

export default function Home() {
  return (
    <main className="flex flex-col place-items-center">
      <Showcase/>
      <Features/>
    </main>
  );
}
