import LayoutPage from '@/components/streaks/LayoutPage';

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className='flex justify-center'>
            <LayoutPage>{children}</LayoutPage>
        </main>
    );
}
