import DashSideNav from "@/components/customUi/DashSideNav";


export default async function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    return (
     <main className="flex justify-center">
        <div className="w-full max-w-7xl mx-3 flex gap-5 pt-8">
            <DashSideNav/>
            {children}
        </div>
     </main>
    );
  }